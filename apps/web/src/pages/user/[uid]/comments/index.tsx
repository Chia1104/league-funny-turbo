import { FeedList } from "@/components";
import { GetServerSideProps, NextPage } from "next";
import type { Feed, Pagenate } from "@wanin/shared/types";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

const UserCommentsPage: NextPage<FeedProps> = () => {
  return (
    <article>
      <h1>comments</h1>
    </article>
  );
};

export default UserCommentsPage;
