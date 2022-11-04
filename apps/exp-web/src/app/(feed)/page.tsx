import type { Feed, Pagenate } from "@wanin/types";
import { FeedList } from "@/components/client";
import { getBaseUrl } from "@/utils/get-base-url";
import { serialize } from "@/utils/hydration.util";

const fetchInitFeed = async () => {
  const data = await fetch(`${getBaseUrl()}/api/feed`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const initFeed = (await data.json()) as Pagenate<Feed[]>;

  return {
    status: data.status,
    initFeed,
  };
};

const HomePage = async () => {
  const { initFeed } = await fetchInitFeed();
  return (
    <article className="mt-28 w-full">
      <FeedList initFeed={serialize(initFeed.data as Feed[])} experimental />
    </article>
  );
};

export default HomePage;
