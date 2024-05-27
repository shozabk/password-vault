import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

const getData = (path: any) => {
  return api.get<any>(path).then((response) => {
    if (!response.data) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  });
};
export const useGetAPI = (path: string) => {
  return useQuery({
    queryKey: [path],
    queryFn: () => getData(path),
    refetchOnWindowFocus: false,
  });
};
