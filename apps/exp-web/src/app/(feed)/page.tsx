import type { Feed } from "@wanin/types";
import { FeedList } from "@/components/client";
import { serialize } from "@/utils/hydration.util";
import { fetchFeedList } from "@/helpers/api/server-only";

const HomePage = async () => {
  const { data: initFeed } = await fetchFeedList();

  return (
    <article className="w-full">
      <FeedList initFeed={serialize(initFeed?.data as Feed[])} experimental />
    </article>
  );
};

export default HomePage;
