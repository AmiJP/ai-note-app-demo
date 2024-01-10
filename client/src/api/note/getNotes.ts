import { axiosClient } from "../axiosClient";
import { baseNoteURL } from "./urls";

export const getNotes = async () => {
  const getNoteURL = baseNoteURL();
  const response = await axiosClient.get(getNoteURL.href);
  return response.data;
};
