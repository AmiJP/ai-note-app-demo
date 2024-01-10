import { AppDataSource } from "../../database/data-source";
import { Note } from "../../entity/Note";
import { AWSClient } from "../../utils/awsClient";

const awsClient = new AWSClient();

export const getNotes = async (userId: number) => {
  const notes = await AppDataSource.manager.find(Note, {
    where: {
      user: {
        id: userId,
      },
    },
  });

  // update notes to get image from s3
  // const updatedNotes = Promise.all(
  //   notes.map(async (note) => {
  //     const imageURL = await awsClient.getImageUrl(note.image);
  //     return {
  //       ...note,
  //       image: imageURL,
  //     };
  //   })
  // );

  return notes;
};
