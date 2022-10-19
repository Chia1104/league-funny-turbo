import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { Feed, Result } from "@wanin/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page = 1 } = req.query;
    const data = await fetch(`${API_URL}/feed?page=${page}`);
    const feeds = (await data.json()) as Result<Feed[]>;
    if (data.status !== 200) {
      res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(feeds);
  } catch (error) {
    const { message, code, status } = error as any;
    return res.status(500).json({ status, message, code });
  }
}
