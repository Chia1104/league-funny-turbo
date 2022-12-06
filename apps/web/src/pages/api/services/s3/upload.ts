import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { resize as resizeFN, convertToWebp } from "@/server/image/services";

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

  switch (req.method) {
    case "POST":
      try {
        const {
          width,
          height,
          image,
        }: { width: string; height: string; image: string } = req.body;
        const { resize = false } = req.query;
        const matches = image.match(regex) as RegExpMatchArray;
        const data = matches[2];
        const buffer = Buffer.from(data, "base64");
        if (resize) {
          const resizedImage = await resizeFN({
            width: parseInt(width),
            height: parseInt(height),
            image: buffer,
          });
          const webp = await convertToWebp(resizedImage);
          const base64 = Buffer.from(webp).toString("base64");
          return res.status(200).json({
            base64,
          });
        }
        const webp = await convertToWebp(buffer);
        const base64 = Buffer.from(webp).toString("base64");
        return res.status(200).json({
          resizedImage: base64,
        });
      } catch (error) {
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
