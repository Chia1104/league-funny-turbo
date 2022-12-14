import type { GetServerSideProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import {
  type Feed,
  type Pagenate,
  ApiResponseStatus,
} from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { fetchFeedList } from "@/helpers/api/routes/feed";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: initFeed,
    status,
    statusCode,
  } = await fetchFeedList({
    page: 1,
  });
  if (status !== ApiResponseStatus.SUCCESS || statusCode !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      status,
      initFeed: initFeed as Pagenate<Feed[]>,
    },
  };
};

const Home: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;

  return (
    <Page className="w-main w-full">
      <Head />
      <article className="mt-28 w-full">
        <FeedList initFeed={initFeed.data} queryKey="home_feed_list" />
      </article>
    </Page>
  );
};

export default Home;
