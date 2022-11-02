import type { NextApiRequest, NextApiResponse } from "next";
import axios, { type AxiosResponse } from "axios";
import { API_URL } from "@/shared/constants";
import fetch from "node-fetch";

type FeedResult = {
  fid: number;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data }: AxiosResponse<FeedResult> = await axios.get(
      `${API_URL}/api/feed-paths`
    );
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    const { message, code, status } = error as any;
    res.status(500).json({ message, code, status });
  }
}
