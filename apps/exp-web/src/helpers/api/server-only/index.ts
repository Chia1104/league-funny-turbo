import "server-only";
import { API_URL } from "@/shared/constants";
import type {
  Feed,
  Pagenate,
  ApiResponse,
  PostCategory,
  LoginSession,
  LaravelToken,
  User,
} from "@wanin/types";
import { type ApiResult } from "@/helpers/api/type";
import { setSearchParams } from "@wanin/utils";

const fetchFeedDetail = async (bcId: string): Promise<ApiResult<Feed>> => {
  const data = await fetch(`${API_URL}/api/feed/${bcId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const status = data.status;
  if (status !== 200) {
    return {
      status,
    };
  }
  const initFeed = (await data.json()) as ApiResponse<Feed>;

  return {
    status: status,
    data: initFeed.data,
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
  const initFeed = (await data.json()) as ApiResponse<Pagenate<Feed[]>>;

  return {
    status: data.status,
    data: initFeed.data,
  };
};

const generateBTypePath = async (): Promise<{ b_type: string }[]> => {
  const res = await fetch(`${API_URL}/api/sidebar`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = (await res.json()) as ApiResponse<PostCategory[]>;
  const { data: bord } = data;
  return (bord as PostCategory[])
    .map((c) => {
      return c.contents.map((b) => ({
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
  const paths = (await posts.json()) as ApiResponse<{ fid: number }[]>;
  return (paths.data as { fid: number }[]).map((path) => ({
    bc_id: path.fid.toString(),
  }));
};

const laravelLogin = async (
  loginSession: LoginSession
): Promise<
  ApiResponse<{
    access: LaravelToken;
    refresh: LaravelToken;
    user: User;
  }>
> => {
  const data = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginSession),
  });
  return data.json();
};

export {
  fetchFeedDetail,
  fetchFeedList,
  generateBTypePath,
  generateBcIdPath,
  laravelLogin,
};
