import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import {
  STSClient,
  GetFederationTokenCommand,
  STSClientConfig,
} from "@aws-sdk/client-sts";
import { v4 as uuidv4 } from "uuid";
import {
  S3_UPLOAD_KEY,
  S3_UPLOAD_SECRET,
  S3_UPLOAD_BUCKET,
  S3_UPLOAD_REGION,
} from "@/shared/constants";
import { slugFormat } from "@wanin/shared/utils";

const uuid = () => uuidv4();
const s3Config: STSClientConfig = {
  credentials: {
    accessKeyId: S3_UPLOAD_KEY as string,
    secretAccessKey: S3_UPLOAD_SECRET as string,
  },
  region: S3_UPLOAD_REGION as string,
};
const s3Policy = {
  Statement: [
    {
      Sid: "Stmt1S3UploadAssets",
      Effect: "Allow",
      Action: ["s3:PutObject"],
      Resource: [`arn:aws:s3:::${S3_UPLOAD_BUCKET}/${S3_UPLOAD_KEY}`],
    },
  ],
};
const sts = new STSClient(s3Config);
const command = new GetFederationTokenCommand({
  Name: "S3UploadWebToken",
  Policy: JSON.stringify(s3Policy),
  DurationSeconds: 60 * 60, // 1 hour
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    raw: true,
  });
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  switch (req.method) {
    case "POST":
      try {
        const filename = req.body.filename ?? uuid();
        const key = `${uuid()}-${slugFormat(filename)}`;
        const s3Token = await sts.send(command);
        return res.status(200).json({
          token: s3Token,
          key,
          bucket: S3_UPLOAD_BUCKET,
          region: S3_UPLOAD_REGION,
        });
      } catch (error) {
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
