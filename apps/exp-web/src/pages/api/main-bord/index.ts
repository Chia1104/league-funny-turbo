import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${API_URL}/api/sidebar`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    const { message, code, status } = error;
    return res.status(500).json({ status, message, code });
  }
}
