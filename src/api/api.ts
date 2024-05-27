import axios from "axios";

const url = import.meta.env.VITE_APP_HOST_NAME;

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((request: any) => {
  let token = localStorage.getItem("token");
  if (!token) return request;

  token = `Bearer ${token}`;
  request.headers!["Authorization"] = token;
  return request;
});
