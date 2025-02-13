import AWS from "aws-sdk";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";

const s3 = new AWS.S3({
  accessKeyId: config.AWS.ACCESS_KEY,
  secretAccessKey: config.AWS.SECRET_KEY,
  region: config.AWS.REGION,
});

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${Date.now()}-${file.originalname}`;

  try {
    const uploadResult = await s3
      .upload({
        Bucket: config.AWS.BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      })
      .promise();

    return uploadResult.Location;
  } catch (error) {
    throw new ApiError("Failed to upload file", 500);
  }
}; 