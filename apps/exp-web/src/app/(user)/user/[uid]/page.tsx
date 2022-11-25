// import { Button } from "@/lib/ui";
import type { Feed } from "@wanin/types";
import {
  FeedList,
  UserIntro,
  UserAbout,
  UserComment,
} from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";
import "./user.scss";

const UserDetailPage = async ({ params }: { params: { uid: string } }) => {
  const { data: initFeed } = await fetchFeedList();
  return (
    <article>
      <UserIntro />
      <div className="user-page">
        <UserAbout />
        <div className="w-full">
          <UserComment />
          <FeedList
            initFeed={initFeed?.data as Feed[]}
            experimental
            queryKey={`${params.uid}_feed_list`}
          />
        </div>
      </div>
    </article>
  );
};

export default UserDetailPage;
