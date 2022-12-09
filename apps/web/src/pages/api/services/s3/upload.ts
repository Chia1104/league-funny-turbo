import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { resizeImage, ResizeOptions } from "@/server/image/services";
import { putObject } from "@/server/s3/services";
import { v4 as uuidv4 } from "uuid";

const regex = /^data:.+\/(.+);base64,(.*)$/;
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
  const uuid = () => uuidv4();

  switch (req.method) {
    case "POST":
      try {
        const {
          width,
          height,
          image,
          format = "webp",
          resize = false,
          fileName = "",
          convert = true,
          bucketFolder = "imgur",
          quality,
        }: ResizeOptions & {
          fileName?: string;
          bucketFolder?: string;
        } = req.body;
        const matches = (image as string).match(regex) as RegExpMatchArray;
        const data = matches[2];
        const resizedImage = await resizeImage({
          resize,
          width,
          height,
          image: data,
          convert,
          quality,
        });
        const buffer = Buffer.from(
          resizedImage.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const key = `${bucketFolder}/${uuid()}-${fileName}.${format}`;
        const s3 = await putObject({
          Key: key,
          Body: buffer,
          ContentType: `image/${format}`,
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
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
