import { Copy, Tick } from "../svgs";

const AllCredentials = ({
  plan,
  copiedEmail,
  handleCopy,
  togglePasswordVisibility,
  showPassword,
  copiedPassword,
}: any) => {
  return (
    <div className="flex flex-col text-start p-2">
      <div className="flex text-sm gap-2 font-semibold text-white">
        <div className="truncate">{plan?.username}</div>
        {copiedEmail && plan._id ? (
          <Tick />
        ) : (
          <div onClick={() => handleCopy(`${plan.username}`, "email")}>
            <Copy />
          </div>
        )}
      </div>
      <div className="flex text-sm gap-2 font-semibold text-white">
        <div onClick={togglePasswordVisibility} className="truncate text-xs">
          Password:{" "}
          <span className="text-sm">
            {showPassword && plan._id ? `${plan?.password}` : "••••••••"}
          </span>
        </div>
        {copiedPassword ? (
          <Tick />
        ) : (
          <div onClick={() => handleCopy(`${plan?.password}`, "password")}>
            <Copy />
          </div>
        )}
      </div>
      <div>{plan?.website}</div>
    </div>
  );
};

export default AllCredentials;
