import { API_URL } from "@/shared/constants";
import type { PostCategory } from "@wanin/types";
import type { ApiResult } from "@/helpers/api/type";
import { setSearchParams } from "@wanin/utils";
import { getBaseUrl } from "@/utils/get-base-url";

const fetchSidebar = async (): Promise<PostCategory[]> => {
  const result = await fetch(`${getBaseUrl()}/api/main-bord`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await result.json();
};

export { fetchSidebar };
