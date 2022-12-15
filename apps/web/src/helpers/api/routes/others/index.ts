import { fetcher, IApiResponse } from "@/utils/fetcher.util";
import type { PostCategory, Tag } from "@wanin/shared/types";

const fetchSidebar = async (): Promise<IApiResponse<PostCategory[]>> => {
  return await fetcher<PostCategory[]>({
    path: "/api/sidebar",
    requestInit: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
};

const fetchBoardCategory = async (
  b_id: number
): Promise<IApiResponse<{ bc_id: number; bc_name: string }[]>> => {
  return await fetcher<{ bc_id: number; bc_name: string }[]>({
    path: "/api/boardCatalogue",
    params: {
      bid: b_id.toString(),
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

const fetchTagList = async (
  searchTag: string
): Promise<IApiResponse<Tag[]>> => {
  return await fetcher<Tag[]>({
    path: "/api/tag-query",
    params: {
      q: searchTag,
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

export { fetchSidebar, fetchBoardCategory, fetchTagList };
