import { fetcher } from "@/utils/fetcher.util";
import { type PostCategory } from "@wanin/shared/types";

const bTypePaths = async (): Promise<{ params: { b_type: string } }[]> => {
  const res = await fetcher<PostCategory[]>({
    path: "/api/sidebar",
    requestInit: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
  const { data } = res;
  return data
    ?.map((group) =>
      group?.contents?.map((content) => {
        return {
          params: {
            b_type: content?.b_type,
          },
        };
      })
    )
    ?.flat() as { params: { b_type: string } }[];
};

const bcIdPaths = async ({
  b_type,
}: {
  b_type: string;
}): Promise<{ params: { b_type: string; bc_id: number } }[]> => {
  const res = await fetcher<{ fid: number }[]>({
    path: "/api/feed-paths",
    params: {
      b_type,
    },
    requestInit: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
  const { data } = res;
  return data?.map((item) => {
    return {
      params: {
        b_type,
        bc_id: item?.fid,
      },
    };
  }) as { params: { b_type: string; bc_id: number } }[];
};

export { bTypePaths };
