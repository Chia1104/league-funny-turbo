import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { resizeImage, ResizeOptions } from "@/server/image/services";
import { putObject } from "@/server/s3/services";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

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
        const { width, height, format = "webp", resize, fileName } = req.query;
        await runMiddleware(
          req,
          res,
          multer({ storage: multer.memoryStorage() }).single("file")
        );
        const file = req.file;
        const buffer = file.buffer;
        const resizedImage = await resizeImage({
          resize: resize === "true",
          width: width ? parseInt(width as string) : undefined,
          height: height ? parseInt(height as string) : undefined,
          format: format as ResizeOptions["format"],
          image: buffer,
        });
        const s3Buffer = Buffer.from(resizedImage, "base64");
        const key = `imgur/${uuid()}-${fileName || ""}.${
          format as ResizeOptions["format"]
        }`;
        const s3 = await putObject({
          Key: key,
          Body: s3Buffer,
          ContentType: `image/${format as ResizeOptions["format"]}`,
        });
        if (s3.$metadata.httpStatusCode !== 200) {
          return res.status(s3.$metadata.httpStatusCode || 403).json({
            message: "Error uploading image",
          });
        }
        return res.status(200).json({
          resizedImage: `data:image/${format};base64,${resizedImage}`,
          imageUrl: `https://img.league-funny.com/${key}`,
        });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
