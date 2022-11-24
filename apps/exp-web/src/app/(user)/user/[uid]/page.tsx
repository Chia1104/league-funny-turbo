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
    <>
      <UserIntro />
      <div className="article">
        <div className="w-full">
          <UserComment />
          <FeedList
            initFeed={initFeed?.data as Feed[]}
            queryKey="home_feed_list"
            experimental
          />
        </div>
        <UserAbout />
      </div>
    </>
  );
};

export default UserDetailPage;
