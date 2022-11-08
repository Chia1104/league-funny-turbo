import "server-only";
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

const generateBTypePath = async (): Promise<{ b_type: string }[]> => {
  const data = await fetch(`${API_URL}/api/sidebar`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const board = await data.json();
  return board
    .map((c: { contents: { b_type: string }[] }) => {
      return c.contents.map((b: { b_type: string }) => ({
        b_type: b.b_type,
      }));
    })
    .flat();
};

const generateBcIdPath = async (
  b_type: string
): Promise<{ bc_id: string }[]> => {
  const posts = await fetch(`${API_URL}/api/feed-paths?b_type=${b_type}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const paths = await posts.json();
  return paths.map((path: { fid: number }) => ({
    bc_id: path.fid.toString(),
  }));
};

export { fetchFeedDetail, fetchFeedList, generateBTypePath, generateBcIdPath };
