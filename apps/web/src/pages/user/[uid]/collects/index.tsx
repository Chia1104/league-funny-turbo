import { FeedList } from "@/components";
import { GetServerSideProps, NextPage } from "next";
import type { Feed, Pagenate } from "@wanin/shared/types";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

const UserCollectsPage: NextPage<FeedProps> = () => {
  return (
    <article>
      <h1>Collects</h1>
    </article>
  );
};

export default UserCollectsPage;
