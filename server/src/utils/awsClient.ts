import {
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class AWSClient {
  private s3Client: S3Client;
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;
  private bucketName: string;

  constructor() {
    this.accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
    this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
    this.region = process.env.AWS_REGION as string;
    this.bucketName = process.env.AWS_BUCKET_NAME as string;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadImage(imageBuffer: Buffer, imageName: string) {
    const imageKey = imageName + (Math.random() * 1000000).toFixed(0);

    const uploadParams = {
      Bucket: this.bucketName,
      Key: imageKey,
      Body: imageBuffer,
      ContentType: "image/jpeg",
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    const result = await this.s3Client.send(putObjectCommand);

    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error("Error uploading image");
    }
    return imageKey;
  }

  async getImageUrl(imageKey: string) {
    const getObjectParams = {
      Bucket: this.bucketName,
      Key: imageKey,
    };

    const getObjectCommand = new GetObjectCommand(getObjectParams);
    const imageURL = await getSignedUrl(this.s3Client, getObjectCommand, {
      expiresIn: 24 * 60 * 60, // 24 hours
    });

    return imageURL;
  }

  async deleteImage(imageKey: string) {
    const deleteObjectParams = {
      Bucket: this.bucketName,
      Key: imageKey,
    };

    const deleteObjectCommand = new DeleteObjectCommand(deleteObjectParams);
    const result = await this.s3Client.send(deleteObjectCommand);

    if (result.$metadata.httpStatusCode !== 204) {
      throw new Error("Error deleting image");
    }
  }
}
