import type { GetStaticProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import { type Feed, type Pagenate } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { fetchFeedList } from "@/helpers/api/routes/feed";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: initFeed, status } = await fetchFeedList({
    page: 1,
  });

  return {
    props: {
      status,
      initFeed: initFeed as Pagenate<Feed[]>,
    },
    revalidate: 60,
  };
};

const HomeSSG: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;

  return (
    <Page className="w-main w-full">
      <Head />
      <article className="mt-28 w-full">
        <FeedList initFeed={initFeed.data} queryKey="home_ssg_feed_list" />
      </article>
    </Page>
  );
};

export default HomeSSG;
