import type { Feed } from "@wanin/shared/types";
import { FeedList, UserComment } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";
import "./user.scss";

const UserDetailPage = async ({ params }: { params: { uid: string } }) => {
  const { data: initFeed } = await fetchFeedList();
  return (
    <article>
      <UserComment />
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        experimental
        queryKey={`${params.uid}_feed_list`}
      />
    </article>
  );
};

export default UserDetailPage;
