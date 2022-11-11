import { API_URL } from "@/shared/constants";
import type { Pagenate, PostCategory, Feed } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";
import { getBaseUrl } from "@/utils/get-base-url";
import { ApiResponse, LaravelToken, LoginSession, User } from "@wanin/types";

const fetchSidebar = async (): Promise<PostCategory[]> => {
  const res = await fetch(`${getBaseUrl()}/api/main-bord`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await res.json();
};

const fetchMoreFeedList = async ({
  page = 1,
  searchParams,
}: {
  page?: number;
  searchParams?: Record<string, string>;
}) => {
  const res = await fetch(
    `${getBaseUrl()}/api/feed?${setSearchParams({
      searchParams: { page: page.toString(), ...searchParams },
    })}`
  );
  const data = (await res.json()) as Pagenate<Feed[]>;
  const { data: feedList } = data;
  return feedList;
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

export { fetchSidebar, fetchMoreFeedList, laravelLogin };
