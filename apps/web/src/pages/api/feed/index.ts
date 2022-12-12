import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL, NEXTAUTH_SECRET } from "@/shared/constants";
import type { Feed, Pagenate, ApiResponse } from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";
import { newPostSchema } from "@wanin/shared/utils/zod-schema";
import { NewPostDTO } from "@wanin/shared/types";
import { getToken } from "next-auth/jwt";

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
        console.log(tags);
        if (!validate.success) {
          return res.status(400).json({ message: "Bad Request" });
        }
        const response = await fetch(`${API_URL}/api/feed`, {
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
        });
        if (response.status !== 200) {
          console.log(await response.json());
          return res.status(400).json({ message: "Bad Request" });
        }
        const data = (await response.json()) as ApiResponse<{
          fid: number;
          gameType: string;
        }>;
        return res.status(200).json({
          status: 200,
          data: data.data,
        });
      } catch (e) {
        return res.status(400).json({ message: "Bad Request" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
