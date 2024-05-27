import { useMutation } from "@tanstack/react-query";
import { api } from "./api";

const ApiPost = (path: string, payload: any) => {
  return api.post<any>(path, payload).then((response) => {
    if (!response.data) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  });
};

export const usePostAPI = () => {
  return useMutation({
    mutationFn: ({ path, payload }: PostApiMutationFunctionPayload) =>
      ApiPost(path, payload),
  });
};

interface PostApiMutationFunctionPayload {
  path: string;
  payload?: any;
}
