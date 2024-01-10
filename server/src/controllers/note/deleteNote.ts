import { AppDataSource } from "../../database/data-source";
import { Note } from "../../entity/Note";
import { AWSClient } from "../../utils/awsClient";

const awsClient = new AWSClient();

export const deleteNote = async (noteId: number, userId: number) => {
  const noteRepository = AppDataSource.manager.getRepository(Note);

  const note = await noteRepository.findOne({
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

  const result = await noteRepository.delete(noteId);

  if (!result.affected) {
    throw new Error("Note not deleted");
  }

  // awsClient.deleteImage(note.image);

  return {
    message: "Note deleted successfully",
    success: true,
  };
};
