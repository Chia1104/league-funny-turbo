import { Button } from "@/lib/ui";
import { getBaseUrl } from "@/utils/get-base-url";
import { Feed, Pagenate } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";
import { serialize } from "@/utils/hydration.util";
import { FeedList } from "@/components/client";

const fetchInitFeed = async (bType: string) => {
  const data = await fetch(
    `${getBaseUrl()}/api/feed?${setSearchParams({
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

const BTPage = async ({ params }: { params: { b_type: string } }) => {
  const { initFeed } = await fetchInitFeed(params.b_type);
  return (
    <article className="mt-28 w-full">
      <FeedList
        initFeed={serialize(initFeed.data as Feed[])}
        experimental
        searchParams={{
          boardType: params.b_type,
        }}
      />
    </article>
  );
};

export default BTPage;
