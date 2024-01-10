import { User } from "@/types";
import { axiosClient } from "../axiosClient";
import { registerUserURL } from "./urls";

export const registerUser = async (user: Partial<User>) => {
  const registerURL = registerUserURL();
  const response = await axiosClient.post(registerURL.href, user);
  return response.data;
};
