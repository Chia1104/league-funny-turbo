import { S3_UPLOAD_BUCKET } from "@/shared/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/server/s3/repositories";

interface PutObjectParams {
  Bucket?: string;
  Key: string;
  Body: string | Buffer;
  ContentType?: string;
  ContentEncoding?: string;
}

const putObject = async (params: PutObjectParams) => {
  const {
    Bucket = S3_UPLOAD_BUCKET,
    Key,
    Body,
    ContentType = "image/webp",
    ContentEncoding = "base64",
  } = params;

  return await s3.send(
    new PutObjectCommand({
      Bucket,
      Key,
      Body,
      ContentType,
      ContentEncoding,
      ACL: "public-read",
    })
  );
};

export { putObject };
