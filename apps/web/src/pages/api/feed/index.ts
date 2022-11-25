import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { Feed, Pagenate, ApiResponse } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
