import { errorConfig } from "@/shared/config/network.config";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { IApiResponse } from "@/utils/fetcher.util";
import { ApiResponseStatus } from "@wanin/shared/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse>
) {
  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    decode: authOptions.jwt?.decode,
  });

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: ApiResponseStatus.ERROR,
      message: errorConfig[401],
    });
  }
}
