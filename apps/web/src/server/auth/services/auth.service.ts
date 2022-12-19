import { getToken as nextAutnGetToken, type JWT } from "next-auth/jwt";
import { NEXTAUTH_SECRET, IS_PRODUCTION } from "@/shared/constants";
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
    secureCookie: IS_PRODUCTION,
  });
};

const getTokenRaw = async (
  req: NextRequest | NextApiRequest
): Promise<string> => {
  return await nextAutnGetToken({
    req,
    secret: NEXTAUTH_SECRET,
    decode: authOptions?.jwt?.decode,
    raw: true,
    secureCookie: IS_PRODUCTION,
  });
};

export { getToken, getTokenRaw };
