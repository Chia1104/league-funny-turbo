import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import { Page } from "@wanin/ui";
import type { Feed, OdataResult } from "@wanin/types";
import { experimental_useInfiniteQuery } from "@/hooks";
import { FeedList } from "@/components";
import { useState } from "react";
import { API_URL } from "@/shared/constants";
import { setSearchParams } from "@wanin/utils";

interface FeedProps {
  status: number;
  initFeed: OdataResult<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(
    `${API_URL}/odata/Feeds?${setSearchParams({
      searchParams: {
        top: "20",
        skip: "0",
        orderby: "fid desc",
      },
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const initFeed = (await data.json()) as OdataResult<Feed[]>;

  return {
    props: {
      status: data.status,
      initFeed,
    },
  };
};

const Home: NextPage<FeedProps> = (props) => {
  const { initFeed, status } = props;
  const [skip, setSkip] = useState(20);
  const {
    data: feeds,
    isLoading,
    isError,
    hasMore,
  } = experimental_useInfiniteQuery<Feed>({
    url: "/api/feed",
    initData: initFeed.value,
    top: 20,
    skip,
    searchParams: {
      orderby: "fid desc",
    },
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
          onMoreFeed={() => setSkip((prev) => prev + 20)}
          hasMoreFeed={hasMore}
          feed={feeds}
        />
      </article>
    </Page>
  );
};

export default Home;
