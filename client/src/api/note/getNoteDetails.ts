import { axiosClient } from "../axiosClient";
import { getNoteDetailsURL } from "./urls";

export const getNoteDetails = async (id: number) => {
  const getNoteURL = getNoteDetailsURL(id);
  const response = await axiosClient.get(getNoteURL.href);
  return response.data;
};
