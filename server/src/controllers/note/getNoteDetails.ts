import { AppDataSource } from "../../database/data-source";
import { Note } from "../../entity/Note";

export const getNoteDetails = async (noteId: number, userId: number) => {
  const note = await AppDataSource.manager.findOne(Note, {
    where: {
      id: noteId,
      user: {
        id: userId,
      },
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};
