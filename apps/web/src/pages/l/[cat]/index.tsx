import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { API_URL } from "@/shared/constants";
import type { Feed, Pagenate } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";
import { useState } from "react";
import { experimental_useInfiniteQuery } from "@/hooks";
import Head from "next/head";
import { FeedList } from "@/components";
import { Page } from "@wanin/ui";
import { useUpdateEffect } from "usehooks-ts";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await fetch(
    `${API_URL}/api/feed?${setSearchParams({
      searchParams: {
        boardType: params?.cat as string,
      },
    })}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const initFeed = (await data.json()) as Pagenate<Feed[]>;

  return {
    props: {
      status: data.status,
      initFeed,
    },
  };
};

/**
 * 🔖 Issue #14
 * [Issue] (https://github.com/league-funny/frontend-nextjs/issues/14)
 *
 * 🔖 Feature #16
 * [Feature] (https://github.com/league-funny/frontend-nextjs/issues/16)
 */
const LCat: NextPage<FeedProps> = (props) => {
  const router = useRouter();
  const { cat } = router.query;
  const { initFeed, status } = props;

  return (
    <Page className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <FeedList
          initFeed={initFeed?.data as Feed[]}
          experimental
          searchParams={{
            boardType: cat as string,
          }}
        />
      </article>
    </Page>
  );
};

export default LCat;
