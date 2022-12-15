import type { NextApiRequest, NextApiResponse } from "next";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { newPostSchema } from "@wanin/shared/utils/zod-schema";
import { NewPostDTO, ApiResponseStatus } from "@wanin/shared/types";
import { getToken } from "next-auth/jwt";
import { fetcher, type IApiResponse } from "@/utils/fetcher.util";
import { errorConfig } from "@/shared/config/network.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<{ fid: number; gameType: string }>>
) {
  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    raw: true,
  });

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: ApiResponseStatus.ERROR,
      message: errorConfig[401],
    });
  }

  switch (req.method) {
    case "POST":
      try {
        const { title, content, cover, tags, gameType, catalogue } =
          req.body satisfies NewPostDTO;
        const validate = newPostSchema.safeParse({
          title,
          content,
          cover,
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
          path: "/api/feed",
          requestInit: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title,
              content,
              cover,
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
