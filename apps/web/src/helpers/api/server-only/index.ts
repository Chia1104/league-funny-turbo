import { API_URL } from "@/shared/constants";
import type {
  Feed,
  Pagenate,
  ApiResponse,
  LoginSession,
  User,
} from "@wanin/shared/types";
import { type ApiResult } from "@/helpers/api/type";
import { setSearchParams } from "@wanin/shared/utils";

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
    }
  );
  const initFeed = (await data.json()) as ApiResponse<Pagenate<Feed[]>>;

  return {
    status: data.status,
    data: initFeed.data,
  };
};

const laravelLogin = async (
  loginSession: LoginSession
): Promise<ApiResponse<User[]>> => {
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

export { fetchFeedDetail, fetchFeedList, laravelLogin };
