import type { Feed } from "@wanin/types";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";
import "../user.scss";

const UserCommentsPage = async ({ params }: { params: { uid: string } }) => {
  const { data: initFeed } = await fetchFeedList();
  return (
    <article>
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        experimental
        queryKey={`${params.uid}_feed_list`}
      />
    </article>
  );
};

export default UserCommentsPage;
