import { FeedList, UserComment } from "@/components";
import { fetchFeedList } from "@/helpers/api/server-only";
import { GetServerSideProps, NextPage } from "next";
import type { Feed, Pagenate } from "@wanin/types";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: initFeed, status } = await fetchFeedList();
  if (!initFeed || initFeed?.data?.length === 0 || status !== 200)
    return {
      notFound: true,
    };

  return {
    props: {
      status,
      initFeed,
    },
  };
};

const UserDetailPage: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;

  return (
    <article>
      <UserComment />
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        experimental
        queryKey="home_feed_list"
      />
    </article>
  );
};

export default UserDetailPage;
