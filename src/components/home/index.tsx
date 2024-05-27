import { useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { Copy, Tick } from "../svgs";

interface HomeProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  plans: any;
  getPlans: any;
}

const Home: React.FC<HomeProps> = ({ setState, plans, getPlans }) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getPlans();
    }
  }, []);
  const [, copy] = useCopyToClipboard();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = (text: string, type: "email" | "password") => {
    copy(text);
    if (type === "email") {
      setCopiedEmail(true);
    } else {
      setCopiedPassword(true);
    }
    setTimeout(() => {
      setCopiedEmail(false);
      setCopiedPassword(false);
    }, 2000);
  };
  const [searchQuery, setSearchQuery] = useState("" as string);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlans = plans?.filter((plan: any) => {
    return (
      plan.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.website.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <>
      <div className="bg-[#333] p-2">
        <label className="w-full input bg-black flex items-center gap-2">
          <input
            type="text"
            className="grow font-base"
            onChange={handleSearchChange}
            value={searchQuery}
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#fff"
            className="w-5 cursor-pointer h-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="bg-[#2c2c2c] p-2 flex items-center justify-between">
        <div className="text-start text-lg font-semibold"> Suggested</div>
        <div
          className="link link-info"
          onClick={() => {
            setState("seeAll");
          }}
        >
          See All
        </div>
      </div>
      <div className="p-3 divide-y-2">
        {filteredPlans?.slice(0, 2).map((plan: any) => (
          <div className="flex flex-col text-start p-1">
            <div className="flex text-sm gap-2 font-semibold text-white">
              <div className="truncate">{plan?.username}</div>
              {copiedEmail ? (
                <Tick />
              ) : (
                <div onClick={() => handleCopy(`${plan.username}`, "email")}>
                  <Copy />
                </div>
              )}
            </div>
            <div className="flex text-sm gap-2 font-semibold text-white">
              <div
                onClick={togglePasswordVisibility}
                className="truncate text-xs"
              >
                Password:{" "}
                <span className="text-sm">
                  {showPassword ? `${plan?.password}` : "••••••••"}
                </span>
              </div>
              {copiedPassword ? (
                <Tick />
              ) : (
                <div
                  onClick={() => handleCopy(`${plan?.password}`, "password")}
                >
                  <Copy />
                </div>
              )}
            </div>
            <div>{plan?.website}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#353535] p-2">
        <button
          onClick={() => {
            setState("addCredentials");
          }}
          className="btn btn-info rounded-md w-full text-lg font-normal text-white"
        >
          Create new
        </button>
      </div>
    </>
  );
};

export default Home;
