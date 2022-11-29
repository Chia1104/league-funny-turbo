import type { Feed } from "@wanin/types";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";
import "../user.scss";

const UserDownsPage = async ({ params }: { params: { uid: string } }) => {
  const { data: initFeed } = await fetchFeedList();
  return (
    <article>
      <h1>Downs</h1>
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        experimental
        queryKey={`${params.uid}_feed_list`}
      />
    </article>
  );
};

export default UserDownsPage;
