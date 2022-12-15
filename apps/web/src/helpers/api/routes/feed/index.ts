import type { Pagenate, Feed, Comment } from "@wanin/shared/types";
import { fetcher, type IApiResponse } from "@/utils/fetcher.util";
import { NewPostDTO } from "@wanin/shared/types";
import { getBaseUrl } from "@/utils/get-base-url";

const fetchFeedList = async ({
  page = 1,
  searchParams,
}: {
  page?: number;
  searchParams?: Record<string, string>;
}): Promise<IApiResponse<Pagenate<Feed[]>>> => {
  return await fetcher<Pagenate<Feed[]>>({
    path: "/api/feed",
    params: {
      page: page.toString(),
      ...searchParams,
    },
    requestInit: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
};

const fetchFeedDetail = async (bcId: string): Promise<IApiResponse<Feed>> => {
  return await fetcher<Feed>({
    path: `/api/feed/${bcId}`,
    requestInit: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
};

const fetchCommentList = async ({
  fid,
  page,
}: {
  fid: number;
  page?: number;
}): Promise<IApiResponse<Pagenate<Comment[]>>> => {
  return await fetcher<Pagenate<Comment[]>>({
    path: "/api/comment",
    params: {
      fid: fid.toString(),
      page: page?.toString() || "1",
    },
    requestInit: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
};

const addNewFeed = async ({
  newPost,
}: {
  newPost: Partial<NewPostDTO>;
}): Promise<
  IApiResponse<{
    fid: number;
    gameType: string;
  }>
> => {
  return await fetcher<{
    fid: number;
    gameType: string;
  }>({
    endpoint: getBaseUrl(),
    path: "/api/event/feed",
    requestInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newPost),
      credentials: "include",
    },
  });
};

const deleteFeed = async (fid: number): Promise<IApiResponse<null>> => {
  return await fetcher<null>({
    endpoint: getBaseUrl(),
    path: `/api/event/feed/${fid}`,
    requestInit: {
      method: "DELETE",
      credentials: "include",
    },
  });
};

export {
  fetchFeedList,
  fetchCommentList,
  fetchFeedDetail,
  addNewFeed,
  deleteFeed,
};
