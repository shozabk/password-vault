import { useState } from "react";
import ReactSelect from "react-select";
import { z } from "zod";
import { useGetAPI } from "../../api/useGetApi";
import { usePostAPI } from "../../api/usePostApi";

const AddCredentials = ({ setState }: any) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    website: "",
    accessList: [] as string[],
  });
  const addSchema = z.object({
    username: z.string().nonempty("Username must be valid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    website: z.string().nonempty("Website must be valid"),
  });
  const [errors, setErrors] = useState<{
    website?: string;
    username?: string;
    password?: string;
    status?: string;
  }>({});

  const { data: users } = useGetAPI("/auth/users");
  const { mutate } = usePostAPI();
  const handleAdd = () => {
    const result = addSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      mutate(
        { path: "/credentials", payload: data },
        {
          onSuccess: () => {
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
        website: errorMessages.website?._errors[0],
        username: errorMessages.username?._errors[0],
        password: errorMessages.password?._errors[0],
      });
    }
  };
  return (
    <>
      <div className="p-3">
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="website" className="leading-7 text-base text-white">
            Website <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="text"
            id="website"
            onChange={(e) => setData({ ...data, website: e.target.value })}
            value={data.website}
            placeholder="www.abc.com"
            name="website"
            className="w-full  rounded text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors.website}</p>
          )}
        </div>
        <div className="flex flex-col items-start mb-4">
          <label htmlFor="email" className="leading-7 text-base text-white">
            Username <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="username"
            id="username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            value={data.username}
            placeholder="username"
            name="username"
            className="w-full  rounded text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
            Password <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="text"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            placeholder="********"
            id="password"
            name="passphrase"
            className="w-full rounded border-none text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out pr-10"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        {users && (
          <div className="flex flex-col items-start mb-4">
            <label
              htmlFor="username"
              className="leading-7 text-base text-white"
            >
              Access To <span className="text-red-500 text-lg">*</span>
            </label>
            <ReactSelect
              className="w-full text-black text-left"
              isMulti
              options={users.map((item) => ({
                value: item._id,
                label: item.username,
              }))}
              onChange={(e: any) => {
                setData({
                  ...data,
                  accessList: e.map((item: any) => item.value),
                });
              }}
            />
          </div>
        )}
        {errors.status && (
          <p className="text-red-500 text-sm text-center">{errors.status}</p>
        )}
      </div>
      <div className="bg-[#333] p-3">
        <button
          onClick={handleAdd}
          className="btn btn-info rounded-md w-full text-lg text-white"
        >
          Add Credentials
        </button>
      </div>
    </>
  );
};

export default AddCredentials;
