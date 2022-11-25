import type { Pagenate, PostCategory, Feed } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";
import { getBaseUrl } from "@/utils/get-base-url";

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

const fetchCommentList = async ({
  fid,
  page,
}: {
  fid: number;
  page?: number;
}) => {
  const res = await fetch(
    `${getBaseUrl()}/api/comment?${setSearchParams({
      searchParams: {
        fid: fid.toString(),
        page: page?.toString() || "1",
      },
    })}`
  );
  const data = (await res.json()) as Pagenate<Comment[]>;
  const { data: commentList } = data;
  return commentList;
};

const fetchBoardCategory = async (
  b_id: number
): Promise<{ bc_id: number; bc_name: string }[]> => {
  const res = await fetch(`${getBaseUrl()}/api/main-bord/${b_id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await res.json();
};

export {
  fetchSidebar,
  fetchMoreFeedList,
  fetchCommentList,
  fetchBoardCategory,
};
