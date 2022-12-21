import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseStatus } from "@wanin/shared/types";
import { fetcher, type IApiResponse } from "@/utils/fetcher.util";
import { errorConfig } from "@/shared/config/network.config";
import { getTokenRaw } from "@/server/auth/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse>
) {
  const raw = await getTokenRaw(req);

  if (!raw) {
    return res.status(401).json({
      statusCode: 401,
      status: ApiResponseStatus.ERROR,
      message: errorConfig[401],
    });
  }

  switch (req.method) {
    case "DELETE":
      try {
        const { c_id } = req.query;
        const result = await fetcher({
          path: `/api/comment/${c_id}`,
          requestInit: {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${raw}`,
            },
          },
        });
        if (result.statusCode === 204) {
          return res.status(204);
        }
        return res.status(result.statusCode).json({
          statusCode: result.statusCode,
          status: result.status,
          message: result?.message,
          data: result?.data,
        });
      } catch (error) {
        return res.status(400).json({
          statusCode: 400,
          status: ApiResponseStatus.ERROR,
          message: errorConfig[400],
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
