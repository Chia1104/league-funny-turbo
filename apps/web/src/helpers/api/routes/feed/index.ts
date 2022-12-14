import type { Pagenate, Feed, NewPostDTO, Comment } from "@wanin/shared/types";
import { fetcher, type IApiResponse } from "@/utils/fetcher.util";

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

const addNewFeed = async (
  newPost: Partial<NewPostDTO>
): Promise<
  IApiResponse<{
    fid: number;
    gameType: string;
  }>
> => {
  return await fetcher<{
    fid: number;
    gameType: string;
  }>({
    path: "/api/feed",
    useAuth: {
      useAdmin: false,
    },
    requestInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newPost),
    },
  });
};

export { fetchFeedList, fetchCommentList, addNewFeed };
