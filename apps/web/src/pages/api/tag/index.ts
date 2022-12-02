import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/shared/constants";
import type { Tag, ApiResponse } from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { q = "" } = req.query;
    const data = await fetch(
      `${API_URL}/api/tag-query?${setSearchParams({
        searchParams: {
          q: q.toString(),
        },
      })}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const _data = (await data.json()) as ApiResponse<Tag[]>;
    if (data.status !== 200 || _data.status !== "success") {
      res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(_data.data);
  } catch (error) {
    const { message, code, status } = error as any;
    return res.status(500).json({ status, message, code });
  }
}
