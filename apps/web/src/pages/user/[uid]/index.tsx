import { FeedList, UserComment } from "@/components";
import { GetServerSideProps, NextPage } from "next";
import type { Feed, Pagenate } from "@wanin/shared/types";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

const UserDetailPage: NextPage<FeedProps> = () => {
  return (
    <article>
      <UserComment querykey="302029" />
    </article>
  );
};

export default UserDetailPage;
