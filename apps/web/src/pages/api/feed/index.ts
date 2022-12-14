import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL, NEXTAUTH_SECRET } from "@/shared/constants";
import type { Feed, Pagenate, ApiResponse } from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";
import { newPostSchema } from "@wanin/shared/utils/zod-schema";
import { NewPostDTO, ApiResponseStatus } from "@wanin/shared/types";
import { getToken } from "next-auth/jwt";
import {
  fetcher,
  type IFetcherOptions,
  type IApiResponse,
} from "@/utils/fetcher.util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { page = 1, top = 20, skip = 0, ...rest } = req.query;
        const data = await fetch(
          `${API_URL}/api/feed?${setSearchParams({
            searchParams: {
              page: page.toString(),
              top: top.toString(),
              skip: skip.toString(),
              ...rest,
            },
          })}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const feeds = (await data.json()) as ApiResponse<Pagenate<Feed[]>>;
        if (data.status !== 200) {
          res.status(404).json({ message: "Not Found" });
        }
        return res.status(200).json(feeds.data);
      } catch (error) {
        const { message, code, status } = error as any;
        return res.status(500).json({ status, message, code });
      }
    case "POST":
      try {
        const token = await getToken({
          req,
          secret: NEXTAUTH_SECRET,
          raw: true,
        });
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
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
          return res.status(400).json({ message: "Bad Request" });
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
          },
        } satisfies IFetcherOptions);
        return res.status(result.statusCode).json(result);
      } catch (e) {
        return res.status(400).json({
          statusCode: 400,
          status: ApiResponseStatus.ERROR,
          message: "Bad Request",
        });
      }
    default:
      return res.status(405).json({
        statusCode: 405,
        status: ApiResponseStatus.ERROR,
        message: "Method Not Allowed",
      });
  }
}
