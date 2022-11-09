import type { Feed } from "@wanin/types";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";

const HomePage = async () => {
  const promise = fetchFeedList();
  const { data: initFeed } = await promise;

  return (
    <article className="w-full">
      <FeedList initFeed={initFeed?.data as Feed[]} experimental />
    </article>
  );
};

export default HomePage;
