import { NewPostDTO } from "@wanin/shared/types";
import { fetcher, IApiResponse } from "@/utils/fetcher.util";

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

export { addNewFeed };
