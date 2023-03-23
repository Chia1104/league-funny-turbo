import type { GetStaticProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import { type Feed, type Pagenate } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { fetchFeedList } from "@/helpers/api/routes/feed";
import ssgConfig from "@/shared/config/ssg.config";
import { useToken } from "@/hooks";

interface FeedProps {
  initFeed: Feed[];
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: initFeed,
    status,
    statusCode,
  } = await fetchFeedList({
    page: 1,
  });

  if (status !== "success" || statusCode !== 200) {
    return {
      notFound: true,
      revalidate: ssgConfig["/b"]["revalidate"],
    };
  }

  return {
    props: {
      initFeed: initFeed as Feed[],
    },
    revalidate: ssgConfig["/b"]["revalidate"],
  };
};

const HomePage: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;
  const { raw, status } = useToken();

  return (
    <Page className="w-main w-full">
      <Head />
      <article className="mt-28 w-full w-bg-secondary rounded-lg shadow-lg">
        <FeedList
          initFeed={initFeed}
          queryKey="home_ssg_feed_list"
          useUpDown={
            status === "authenticated" ? { raw: raw as string } : undefined
          }
        />
      </article>
    </Page>
  );
};

export default HomePage;
