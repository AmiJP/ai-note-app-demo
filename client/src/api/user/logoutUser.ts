import { axiosClient } from "../axiosClient";
import { logoutUserURL } from "./urls";

export const logoutUser = async () => {
  const logoutURL = logoutUserURL();
  const response = await axiosClient.post(logoutURL.href);
  return response.data;
};
