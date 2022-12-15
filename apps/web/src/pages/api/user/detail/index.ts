import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const raw = await getToken({
          req,
          secret: NEXTAUTH_SECRET,
          raw: true,
        });
        const token = await getToken({
          req,
          secret: NEXTAUTH_SECRET,
          decode: authOptions?.jwt?.decode,
        });
        if (!token || !raw) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({ token, raw });
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
