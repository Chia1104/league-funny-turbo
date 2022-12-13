import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { resizeImage, ResizeOptions } from "@/server/image/services";
import { putObject } from "@/server/s3/services";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { MAX_FILE_SIZE } from "@wanin/shared/utils";

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

  switch (req.method) {
    case "POST":
      try {
        const {
          width,
          height,
          format = "webp",
          resize,
          fileName,
          convert = "true",
          bucketFolder = "imgur",
          quality,
          fileNamePrefix = "",
        } = req.query;
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
        const _fileName = file.originalname.split(".")[0];
        const ext = file.mimetype.split("/")[1];
        const buffer = file.buffer;
        const resizedImage = await resizeImage({
          resize: resize === "true",
          convert: convert === "true",
          quality: quality ? parseInt(quality as string) : undefined,
          width: width ? parseInt(width as string) : undefined,
          height: height ? parseInt(height as string) : undefined,
          format: format as ResizeOptions["format"],
          image: buffer,
        });
        const s3Buffer = Buffer.from(resizedImage, "base64");
        const originalImage = Buffer.from(buffer, "base64");
        const _uuid = uuid();
        const key = `${bucketFolder}/${_uuid}${fileNamePrefix}${
          fileName || _fileName
        }.${convert === "true" ? format : ext}`;
        const originalKey = `${bucketFolder}/${_uuid}_o${
          fileName || _fileName
        }.${ext}`;
        const s3 = await putObject({
          Key: key,
          Body: s3Buffer,
          ContentType: `image/${format as ResizeOptions["format"]}`,
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
          resizedImage: `data:image/${format};base64,${resizedImage}`,
          imageUrl: `https://img.league-funny.com/${key}`,
        });
      } catch (error) {
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}