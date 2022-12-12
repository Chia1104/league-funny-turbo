import { STSClient, STSClientConfig } from "@aws-sdk/client-sts";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import {
  S3_UPLOAD_KEY,
  S3_UPLOAD_SECRET,
  S3_UPLOAD_REGION,
} from "@/shared/constants";

const stsConfig: STSClientConfig = {
  credentials: {
    accessKeyId: S3_UPLOAD_KEY as string,
    secretAccessKey: S3_UPLOAD_SECRET as string,
  },
  region: S3_UPLOAD_REGION as string,
};

const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: S3_UPLOAD_KEY as string,
    secretAccessKey: S3_UPLOAD_SECRET as string,
  },
  region: S3_UPLOAD_REGION as string,
};

const sts = new STSClient(stsConfig);
const s3 = new S3Client(s3Config);

export { s3, sts };
