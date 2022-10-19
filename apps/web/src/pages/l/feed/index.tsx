import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import { getBaseUrl } from "@/utils/getBaseUrl";
import type { Feed, Result } from "@wanin/types";
import { useInfiniteQuery } from "@/hooks";
import { FeedList } from "@/components";
import { useState } from "react";

interface FeedProps {
  status: number;
  initFeed: Result<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(`${getBaseUrl()}/api/feed`);
  const initFeed = (await data.json()) as Result<Feed[]>;

  return {
    props: {
      status: data.status,
      initFeed,
    },
  };
};

const Feed: NextPage<FeedProps> = (props) => {
  const { initFeed, status } = props;
  const [page, setPage] = useState(2);
  const {
    data: feeds,
    isLoading,
    isError,
    hasMore,
  } = useInfiniteQuery<Feed>({
    url: "/api/feed",
    initData: initFeed.data,
    page,
  });

  return (
    <Page className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <h1>Feed</h1>
        <FeedList
          isLoading={isLoading}
          isSuccess={status === 200}
          isError={isError || status !== 200}
          onMoreFeed={() => setPage((prev) => prev + 1)}
          hasMoreFeed={hasMore}
          feed={feeds}
        />
      </article>
    </Page>
  );
};

export default Feed;
