import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { Comment, Pagenate, ApiResponse } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { fid, page, ...rest } = req.query;
    const data = await fetch(
      `${API_URL}/api/comment?${setSearchParams({
        searchParams: {
          fid: fid?.toString() || "",
          page: page?.toString() || "1",
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
    const comments = (await data.json()) as ApiResponse<Pagenate<Comment[]>>;
    if (data.status !== 200) {
      res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(comments.data);
  } catch (error) {
    const { message, code, status } = error as any;
    return res.status(500).json({ status, message, code });
  }
}
