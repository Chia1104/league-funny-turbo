import { getToken as nextAutnGetToken, type JWT } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";

const getToken = async (
  req: NextRequest | NextApiRequest
): Promise<JWT | null> => {
  return await nextAutnGetToken({
    req,
    secret: NEXTAUTH_SECRET,
    decode: authOptions?.jwt?.decode,
    secureCookie: true,
  });
};

const getTokenRaw = async (
  req: NextRequest | NextApiRequest
): Promise<string> => {
  return await nextAutnGetToken({
    req,
    secret: NEXTAUTH_SECRET,
    raw: true,
    secureCookie: true,
  });
};

export { getToken, getTokenRaw };
