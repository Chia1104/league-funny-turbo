import { NewPostDTO } from "@wanin/shared/types";
import { fetcher, IApiResponse } from "@/utils/fetcher.util";
import { type JWT } from "next-auth/jwt";

const addNewFeed = async ({
  token,
  raw,
  newPost,
}: {
  token?: JWT | null;
  raw?: string | null;
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
    path: "/api/feed",
    useAuth: {
      token,
      raw,
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

export { addNewFeed };
