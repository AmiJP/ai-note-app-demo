import { axiosClient } from "../axiosClient";
import { getAccountURL } from "./urls";

export const getAccount = async () => {
  const accountURL = getAccountURL();
  const response = await axiosClient.get(accountURL.href);
  return response.data;
};
