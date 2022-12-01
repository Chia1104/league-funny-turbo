import { FeedList } from "@/components";
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

const UserUpsPage: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;

  return (
    <article>
      <h1>Ups</h1>
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        experimental
        // queryKey={`${params.uid}_feed_list`}
        queryKey="home_feed_list"
      />
    </article>
  );
};

export default UserUpsPage;
