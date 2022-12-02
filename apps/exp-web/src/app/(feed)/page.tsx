import type { Feed } from "@wanin/shared/types";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";

const HomePage = async () => {
  const { data: initFeed } = await fetchFeedList();

  return (
    <article className="w-full pt-[110px]">
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        queryKey="home_feed_list"
        experimental
      />
    </article>
  );
};

export default HomePage;
