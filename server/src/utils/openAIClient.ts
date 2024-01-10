import OpenAI from "openai";
import { getMockImage } from "./getMockImage";

export class OpenAiClient {
  private openai: OpenAI;
  private imageModel: string;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.imageModel = "dall-e-2";
  }

  async generateImage({ prompt }: { prompt: string }) {
    // mock image url for development and testing
    if (process.env.NODE_ENV === "development") {
      return getMockImage();
    }

    const response = await this.openai.images.generate({
      prompt: prompt,
      model: this.imageModel,
      size: "256x256",
    });

    if (!response.data[0].url) {
      throw new Error("Image not generated");
    }

    return response.data[0].url;
  }
}
