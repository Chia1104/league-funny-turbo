import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, JWT } from "next-auth/jwt";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { authOptions } from "./[...nextauth]";
import { IApiResponse } from "@/utils/fetcher.util";
import { errorConfig } from "@/shared/config/network.config";
import { ApiResponseStatus } from "@wanin/shared/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<{ raw: string; token: JWT }>>
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
          return res.status(401).json({
            statusCode: 401,
            status: ApiResponseStatus.ERROR,
            message: errorConfig[401],
          });
        }
        return res.status(200).json({
          statusCode: 200,
          status: ApiResponseStatus.SUCCESS,
          data: { token, raw },
        });
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          status: ApiResponseStatus.ERROR,
          message: errorConfig[500],
        });
      }
    default:
      return res.status(405).json({
        statusCode: 405,
        status: ApiResponseStatus.ERROR,
        message: errorConfig[405],
      });
  }
}
