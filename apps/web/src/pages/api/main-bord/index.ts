import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { PostCategory } from "@wanin/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostCategory[]>
) {
  const response = await fetch(`${API_URL}/api/sidebar`);
  const data = await response.json();
  res.status(200).json(data);
}
