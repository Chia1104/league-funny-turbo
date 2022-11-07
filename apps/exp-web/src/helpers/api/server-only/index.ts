import "server-only";
import type { NextApiRequest } from "next";
import { API_URL } from "@/shared/constants";
import type { Feed, Pagenate } from "@wanin/types";
import type { ApiResult } from "@/helpers/api/type";
import { setSearchParams } from "@wanin/utils";
import { getBaseUrl } from "@/utils/get-base-url";

const fetchFeedDetail = async (bcId: string): Promise<ApiResult<Feed>> => {
  const data = await fetch(`${API_URL}/api/feed/${bcId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const initFeed = (await data.json()) as Feed;

  return {
    status: data.status,
    data: initFeed,
  };
};

const fetchFeedList = async (
  bType?: string
): Promise<ApiResult<Pagenate<Feed[]>>> => {
  const data = await fetch(
    `${API_URL}/api/feed?${setSearchParams({
      searchParams: {
        boardType: bType || "",
      },
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  const initFeed = (await data.json()) as Pagenate<Feed[]>;

  return {
    status: data.status,
    data: initFeed,
  };
};

const verifyToken = async () => {
  const data = await fetch(`${getBaseUrl()}/api/user/detail`);
  const token = (await data.json()) as string;

  return {
    status: data.status,
    data: token,
  };
};

export { fetchFeedDetail, fetchFeedList };
