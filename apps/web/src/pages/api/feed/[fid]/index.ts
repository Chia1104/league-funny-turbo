import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { Feed } from "@wanin/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { fid } = req.query;
    const data = await fetch(`${API_URL}/api/feed/${fid}`);
    const feed: Feed = await data.json();
    if (data.status !== 200) {
      res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(feed);
  } catch (error) {
    const { message, code, status } = error as any;
    return res.status(500).json({ status, message, code });
  }
}
