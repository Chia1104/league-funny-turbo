import { NewVideoDTO } from "@wanin/shared/types";
import { fetcher, IApiResponse } from "@/utils/fetcher.util";
import { getBaseUrl } from "@/utils/get-base-url";

const addPlaylist = async (
  newPlaylist: Partial<NewVideoDTO>
): Promise<
  IApiResponse<{
    fid: number;
    gameType: string;
  }>
> => {
  return await fetcher<{ fid: number; gameType: string }>({
    endpoint: getBaseUrl(),
    path: "/api/playlist",
    requestInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newPlaylist),
    },
  });
};

export { addPlaylist };
