import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { resizeImage, getMetadata } from "@/server/image/services";
import { putObject } from "@/server/s3/services";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { MAX_FILE_SIZE } from "@wanin/shared/utils";
import { resizeConfig } from "@/shared/config/image.config";

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
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
  const uuid = () => uuidv4();
  const resizeWidth = resizeConfig["froala"].width;

  switch (req.method) {
    case "POST":
      try {
        await runMiddleware(
          req,
          res,
          multer({
            limits: { fileSize: MAX_FILE_SIZE },
            storage: multer.memoryStorage(),
          }).single("file")
        );
        const file = req.file;
        if (!file.mimetype.match(/jpg|jpeg|png|gif|webp/)) {
          return res.status(400).json({ message: "Invalid file type" });
        }
        const fileName = file.originalname.split(".")[0];
        const ext = file.mimetype.split("/")[1];
        const buffer = file.buffer;
        const metadata = await getMetadata(buffer);
        const resizedImage = await resizeImage({
          resize: (metadata.width ?? resizeWidth) > resizeWidth,
          width:
            (metadata.width ?? resizeWidth) > resizeWidth
              ? resizeWidth
              : metadata.width,
          image: buffer,
          convert: file.mimetype.match(/jpg|jpeg|png|webp/),
        });
        const s3Buffer = Buffer.from(resizedImage, "base64");
        const originalImage = Buffer.from(buffer, "base64");
        const _uuid = uuid();
        const key = `imgur/${_uuid}_n${fileName}.${
          file.mimetype === "image/gif" ? "gif" : "webp"
        }`;
        const originalKey = `imgur/${_uuid}_o${fileName}.${ext}`;
        const s3 = await putObject({
          Key: key,
          Body: s3Buffer,
          ContentType: `image/${
            file.mimetype === "image/gif" ? "gif" : "webp"
          }`,
        });
        const originalS3 = await putObject({
          Key: originalKey,
          Body: originalImage,
          ContentType: `image/${ext}`,
        });
        if (s3.$metadata.httpStatusCode !== 200) {
          return res.status(s3.$metadata.httpStatusCode || 403).json({
            message: "Error uploading image",
          });
        }
        if (originalS3.$metadata.httpStatusCode !== 200) {
          return res.status(originalS3.$metadata.httpStatusCode || 403).json({
            message: "Error uploading image",
          });
        }
        return res.status(200).json({
          link: `https://img.league-funny.com/${key}`,
        });
      } catch (error) {
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
