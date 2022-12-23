import type { NextApiRequest, NextApiResponse } from "next";
import { fetcher, type IApiResponse } from "@/utils/fetcher.util";
import { errorConfig } from "@/shared/config/network.config";
import { getTokenRaw } from "@/server/auth/services";
import { ApiResponseStatus } from "@wanin/shared/types";
import type { Comment, Pagenate } from "@wanin/shared/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse>
) {
  switch (req.method) {
    case "GET":
      try {
        const { fid, page } = req.query;
        const result = await fetcher<Pagenate<Comment[]>>({
          path: "/api/comment",
          params: {
            fid: fid ? fid.toString() : undefined,
            page: page ? page.toString() : undefined,
          },
          requestInit: {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        });
        if (result.status !== ApiResponseStatus.SUCCESS) {
          return res.status(result.statusCode).json({
            statusCode: result.statusCode,
            status: ApiResponseStatus.ERROR,
            message: result.message,
          });
        }
        return res.status(200).json({
          statusCode: 200,
          status: ApiResponseStatus.SUCCESS,
          data: result.data,
        });
      } catch (error) {
        return res.status(500).json({
          statusCode: 500,
          status: ApiResponseStatus.ERROR,
          message: errorConfig[500],
        });
      }
    case "POST":
      try {
        const raw = await getTokenRaw(req);

        if (!raw) {
          return res.status(401).json({
            statusCode: 401,
            status: ApiResponseStatus.ERROR,
            message: errorConfig[401],
          });
        }
        const { fid, message, parent } = req.body;
        const result = await fetcher<Comment>({
          path: "/api/comment",
          requestInit: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${raw}`,
            },
            body: JSON.stringify({
              fid,
              message,
              parent,
            }),
          },
        });
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
