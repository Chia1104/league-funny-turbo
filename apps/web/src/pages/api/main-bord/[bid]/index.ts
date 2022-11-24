import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@wanin/types";
import { API_URL } from "@/shared/constants";

const fetchBoardCategory = async (
  b_id: number
): Promise<ApiResponse<{ bc_id: number; bc_name: string }[]>> => {
  const data = await fetch(`${API_URL}/api/boardCatalogue?bid=${b_id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data.json();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetchBoardCategory(
      parseInt(req.query.bid as string)
    );
    if (response.status !== "success") {
      return res.status(404).json({ message: "Not Found" });
    }
    const { data } = response;
    return res.status(200).json(data);
  } catch (error: any) {
    const { message, code, status } = error;
    return res.status(500).json({ status, message, code });
  }
}
