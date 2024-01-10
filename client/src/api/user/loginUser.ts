import { User } from "@/types";
import { axiosClient } from "../axiosClient";
import { loginUserURL } from "./urls";

export const loginUser = async (user: Partial<User>) => {
  const loginURL = loginUserURL();
  const response = await axiosClient.post(loginURL.href, user);
  return response.data;
};
