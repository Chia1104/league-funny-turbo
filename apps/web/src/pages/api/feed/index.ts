import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { Feed, OdataResult } from "@wanin/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page = 1, top = 20, skip = 0, ...rest } = req.query;
    const data = await fetch(
      `${API_URL}/odata/Feeds?${new URLSearchParams({
        page: page.toString(),
        top: top.toString(),
        skip: skip.toString(),
        ...rest,
      })}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const feeds = (await data.json()) as OdataResult<Feed[]>;
    if (data.status !== 200) {
      res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(feeds);
  } catch (error) {
    const { message, code, status } = error as any;
    return res.status(500).json({ status, message, code });
  }
}
