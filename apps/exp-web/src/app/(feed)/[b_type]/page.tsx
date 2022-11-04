import { Button } from "@/lib/ui";
import { getBaseUrl } from "@/utils/get-base-url";
import { Feed, Pagenate } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";

const fetchInitFeed = async (bType: string) => {
  const data = await fetch(
    `${getBaseUrl()}/api/feed${setSearchParams({
      searchParams: {
        boardType: bType,
      },
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  const initFeed = (await data.json()) as Pagenate<Feed[]>;

  return {
    status: data.status,
    initFeed,
  };
};

const BTPage = () => {
  return (
    <article className="mt-28 w-full">
      <Button text="test" />
    </article>
  );
};

export default BTPage;
