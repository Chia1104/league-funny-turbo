import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
