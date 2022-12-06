import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { resize } from "@/server/image/services";

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
        const { width, height, image } = req.body;
        console.log("image", image);
        const matches = image.match(regex);
        const data = matches[2];
        const buffer = Buffer.from(data, "base64");
        const base64 = Buffer.from(buffer).toString("base64");
        const resizedImage = await resize({
          width,
          height,
          image: buffer,
        });
        return res.status(200).json({
          resizedImage,
        });
      } catch (error) {
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
