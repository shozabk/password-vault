import { useState } from "react";
import { usePostAPI } from "../../api/usePostApi";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

// Define the Zod schema for the form data
const loginSchema = z.object({
  username: z.string().nonempty("Username must be valid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login: React.FC<LoginProps> = ({ setState }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    status?: string;
  }>({});

  const { mutate } = usePostAPI();

  const handleLogin = () => {
    const result = loginSchema.safeParse(data);

    if (result.success) {
      setErrors({});
      mutate(
        { path: "/auth/login", payload: data },
        {
          onSuccess: (response) => {
            localStorage.setItem("token", response.token);
            setState("home");
          },
          onError: (error: any) => {
            setErrors({ status: error?.response?.data?.message });
          },
        }
      );
    } else {
      const errorMessages = result.error.format();
      setErrors({
        username: errorMessages.username?._errors[0],
        password: errorMessages.password?._errors[0],
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="p-3">
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="username" className="leading-7 text-base text-white">
            Username <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="email"
            id="username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
            placeholder="abc@thehexaa.com"
            name="username"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full bg-white rounded text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col items-start mb-4">
          <label
            htmlFor="passphrase"
            className="leading-7 text-base text-white"
          >
            Passphrase <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="w-full relative">
            <input
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
              placeholder="********"
              id="passphrase"
              name="passphrase"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full bg-[#9d28b0] placeholder-white rounded border-none text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-white"
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        {errors.status && (
          <p className="text-red-500 text-sm text-center">{errors.status}</p>
        )}
      </div>
      <div className="bg-[#333] p-3">
        <button
          onClick={handleLogin}
          className="btn btn-info rounded-md w-full text-lg text-white"
        >
          login
        </button>
      </div>
    </>
  );
};

export default Login;
