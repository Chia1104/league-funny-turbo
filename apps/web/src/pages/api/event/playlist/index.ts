import { getTokenRaw } from "@/server/auth/services";
import { errorConfig } from "@/shared/config/network.config";
import { fetcher, IApiResponse } from "@/utils/fetcher.util";
import { NewVideoDTO, ApiResponseStatus } from "@wanin/shared/types";
import { newVideoSchema } from "@wanin/shared/utils/zod-schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<{ fid: number; gameType: string }>>
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
    case "POST":
      try {
        const { title, videoUrls, tags, gameType, catalogue } =
          req.body satisfies NewVideoDTO;
        const validate = newVideoSchema.safeParse({
          title,
          videoUrls,
          tags,
          gameType,
          catalogue,
        });

        if (!validate.success) {
          return res.status(400).json({
            statusCode: 400,
            status: ApiResponseStatus.ERROR,
            message: errorConfig[400],
          });
        }
        const result = await fetcher<{ fid: number; gameType: string }>({
          path: "/api/playlist",
          requestInit: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${raw}`,
            },
            body: JSON.stringify({
              title,
              videoUrls,
              tags,
              gameType,
              catalogue,
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
