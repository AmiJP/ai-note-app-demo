import { Note } from "@/types";
import { axiosClient } from "../axiosClient";
import { editNoteURL } from "./urls";

export const editNote = async (note: Note) => {
  const noteEditURL = editNoteURL(note.id);
  const response = await axiosClient.put(noteEditURL.href, note);
  return response.data;
};
