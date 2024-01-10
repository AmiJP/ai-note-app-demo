import { AppDataSource } from "../../database/data-source";
import { Note } from "../../entity/Note";
import { AWSClient } from "../../utils/awsClient";

const awsClient = new AWSClient();

export const updateNote = async (
  noteId: number,
  userId: number,
  noteData: {
    title?: string;
    note?: string;
    image?: string;
  }
) => {
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

  note.title = noteData.title || note.title;
  note.note = noteData.note || note.note;
  note.image = noteData.image || note.image;

  const updatedNote = await AppDataSource.manager.save(note);

  // const imageURL = await awsClient.getImageUrl(updatedNote.image);

  if (!updatedNote) {
    throw new Error("Note not found");
  }

  return {
    message: "Note updated successfully",
    data: updatedNote,
  };
};
