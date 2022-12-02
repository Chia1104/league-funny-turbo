import type { Feed } from "@wanin/shared/types";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";
import "../user.scss";

const UserUpsPage = async ({ params }: { params: { uid: string } }) => {
  const { data: initFeed } = await fetchFeedList();
  return (
    <article>
      <h1>Ups</h1>
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        experimental
        queryKey={`${params.uid}_feed_list`}
      />
    </article>
  );
};

export default UserUpsPage;
