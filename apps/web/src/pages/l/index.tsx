import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import type { Feed, Pagenate } from "@wanin/types";
import { experimental_useInfiniteQuery } from "@/hooks";
import { FeedList } from "@/components";
import { useState } from "react";
import { API_URL } from "@/shared/constants";
import { trpc } from "@/utils/trpc";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(`${API_URL}/api/feed`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const initFeed = (await data.json()) as Pagenate<Feed[]>;

  return {
    props: {
      status: data.status,
      initFeed,
    },
  };
};

const Home: NextPage<FeedProps> = (props) => {
  const token = trpc.auth.getToken.useQuery();

  console.log(token?.data ?? "no user token");

  const { initFeed, status } = props;
  const [page, setPage] = useState(1);
  const {
    data: feeds,
    isLoading,
    isError,
    hasMore,
  } = experimental_useInfiniteQuery<Feed>({
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

export default Home;
