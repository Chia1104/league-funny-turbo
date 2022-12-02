import type { GetServerSideProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import type { Feed, Pagenate } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { fetchFeedList } from "@/helpers/api/server-only";

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

const Home: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;

  return (
    <Page className="w-main w-full">
      <Head />
      <article className="mt-28 w-full">
        <FeedList
          initFeed={initFeed.data as Feed[]}
          experimental
          queryKey="home_feed_list"
        />
      </article>
    </Page>
  );
};

export default Home;
