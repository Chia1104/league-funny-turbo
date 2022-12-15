import { FeedList } from "@/components";
import { GetServerSideProps, NextPage } from "next";
import type { Feed, Pagenate } from "@wanin/shared/types";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

const UserDownsPage: NextPage<FeedProps> = () => {
  return (
    <article>
      <h1>Downs</h1>
    </article>
  );
};

export default UserDownsPage;
