import { axiosClient } from "../axiosClient";
import { deleteNoteURL } from "./urls";

export const deleteNote = async (id: number) => {
  const deleteURL = deleteNoteURL(id);
  const response = await axiosClient.delete(deleteURL.href);
  return response.data;
};
