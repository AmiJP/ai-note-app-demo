import { baseURL } from "../urls";

export const baseNoteURL = () => {
  const url = new URL(baseURL);
  url.pathname += "note/";
  return url;
};

export const addNoteURL = () => {
  const url = baseNoteURL();
  url.pathname += "create/";
  return url;
};

export const deleteNoteURL = (id: number) => {
  const url = baseNoteURL();
  url.pathname += id;
  return url;
};

export const getNoteDetailsURL = (id: number) => {
  const url = baseNoteURL();
  url.pathname += id;
  return url;
};

export const editNoteURL = (id: number) => {
  const url = baseNoteURL();
  url.pathname += id;
  return url;
};
