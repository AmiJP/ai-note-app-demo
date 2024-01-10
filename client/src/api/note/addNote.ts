import { Note } from "@/types";
import { axiosClient } from "../axiosClient";
import { addNoteURL } from "./urls";

export const addNote = async (note: Partial<Note>) => {
  const noteAddURL = addNoteURL();
  const response = await axiosClient.post(noteAddURL.href, note);
  return response.data;
};
