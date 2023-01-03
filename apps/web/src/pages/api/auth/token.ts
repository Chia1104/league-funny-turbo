import type { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse } from "@/utils/fetcher.util";
import { errorConfig } from "@/shared/config/network.config";
import { ApiResponseStatus } from "@wanin/shared/types";
import { getTokenRaw, getToken } from "@/server/auth/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<{ raw: string }>>
) {
  switch (req.method) {
    case "POST":
      try {
        const raw = await getTokenRaw(req);
        const token = await getToken(req);
        if (!token) {
          return res.status(401).json({
            statusCode: 401,
            status: ApiResponseStatus.ERROR,
            message: errorConfig[401],
          });
        }
        return res.status(200).json({
          statusCode: 200,
          status: ApiResponseStatus.SUCCESS,
          data: { raw },
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
