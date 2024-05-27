import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/home";
import Logo from "./assets/icon.png";
import AllCredentials from "./components/AllCredentials";
import AddCredentials from "./components/AddCredentials";
import { useGetAPI } from "./api/useGetApi";
import { useCopyToClipboard } from "usehooks-ts";
import { api } from "./api/api";
import { FaPowerOff } from "react-icons/fa";
interface LayoutProps {
  children: React.ReactNode;
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}

const Layout: React.FC<LayoutProps> = ({ children, setState, state }) => {
  return (
    <>
      <div className=" bg-[#333] flex items-center justify-between">
        <div
          onClick={() => {
            if (localStorage.getItem("token")) {
              setState("home");
            }
          }}
          className="cursor-pointer text-lg p-2 gap-2 flex items-center uppercase font-bold"
        >
          pass Vault
          <img src={Logo} className="w-6" alt="Vite logo" />
        </div>
        {(state === "home" || state === "seeAll") && (
          <div
            className="px-2 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              setState("login");
            }}
          >
            <FaPowerOff />
          </div>
        )}
      </div>
      {children}
    </>
  );
};

function App() {
  const [state, setState] = useState("login" as string);

  const { data: plans, refetch: getPlans } = useGetAPI("/credentials");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setState("home");
    }
  }, []);

  useEffect(() => {
    if (api.interceptors.response) {
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            setState("login");
          }
          return Promise.reject(error);
        }
      );
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[350px]">
      <Layout setState={setState} state={state}>
        {state === "login" ? (
          <Login setState={setState} />
        ) : state === "home" ? (
          <Home setState={setState} plans={plans} getPlans={getPlans} />
        ) : state === "seeAll" ? (
          <div className="divide-y-2 h-[300px] overflow-auto">
            {plans.map((plan: any) => (
              <AllCredentials
                key={plan._id}
                plan={plan}
                copiedEmail={copiedEmail}
                handleCopy={handleCopy}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                copiedPassword={copiedPassword}
              />
            ))}
          </div>
        ) : state === "addCredentials" ? (
          <AddCredentials setState={setState} />
        ) : null}
      </Layout>
    </div>
  );
}

export default App;
