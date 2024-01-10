import { AppDataSource } from "../../database/data-source";
import { Note } from "../../entity/Note";
import { User } from "../../entity/User";
import { AWSClient } from "../../utils/awsClient";
import { downloadImage } from "../../utils/downloadImage";
import { OpenAiClient } from "../../utils/openAIClient";

const openAiClient = new OpenAiClient();
const awsClient = new AWSClient();

export const createNote = async (
  title: string,
  note: string,
  userId: number
) => {
  const user = await AppDataSource.manager.findOneBy(User, {
    id: userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const aiImageURL = await openAiClient.generateImage({ prompt: title });
  console.log("aiImageURL", aiImageURL);

  // download image buffer from openai image url
  // const imageBuffer = await downloadImage(aiImageURL);

  // upload it to s3
  // const imageKey = await awsClient.uploadImage(imageBuffer, title);

  const newNote = new Note();
  newNote.title = title;
  newNote.image = aiImageURL as string;
  newNote.note = note;
  newNote.user = user;

  const result = await AppDataSource.manager.save(newNote);

  return {
    message: "Note created successfully",
    data: {
      id: result.id,
      title: result.title,
      image: aiImageURL,
      note: result.note,
    },
  };
};
