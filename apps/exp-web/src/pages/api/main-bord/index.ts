import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import fetch from "node-fetch";
import type { ApiResponse, PostCategory } from "@wanin/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${API_URL}/api/sidebar`);
    const data = (await response.json()) as ApiResponse<PostCategory[]>;
    res.status(200).json(data.data);
  } catch (error: any) {
    const { message, code, status } = error;
    return res.status(500).json({ status, message, code });
  }
}
