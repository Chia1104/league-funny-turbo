import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { type Feed, type Pagenate, type Board } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList, fetchFeedBoardDetail } from "@/helpers/api/routes/feed";
import { ApiResponseStatus } from "@wanin/shared/types";
import { useIsMounted } from "usehooks-ts";
import { useState, useEffect } from "react";
import { useToken } from "@/hooks";

interface FeedProps {
  boardDetail: Board;
  initFeed: Feed[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, query } = ctx;
  const { data: initFeed, status } = await fetchFeedList({
    searchParams: {
      boardType: params?.b_type as string,
      sort: query?.sort as string,
      catalogue: query?.catalogue as string,
    },
  });
  const { data: boardDetail, status: boardStatus } = await fetchFeedBoardDetail(
    {
      b_type: params?.b_type as string,
    }
  );

  if (
    status !== ApiResponseStatus.SUCCESS ||
    boardStatus !== ApiResponseStatus.SUCCESS
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initFeed: initFeed,
      boardDetail: boardDetail,
    } satisfies Partial<FeedProps>,
  };
};

const BPage: NextPage<FeedProps> = (props) => {
  const router = useRouter();
  const { b_type, sort = "hot", catalogue } = router.query;
  const { initFeed, boardDetail } = props;
  const isMounted = useIsMounted();
  const [enableClientFetchBoard, setEnableClientFetchBoard] =
    useState<boolean>(false);
  const { raw, status } = useToken();

  useEffect(() => {
    if (!b_type || b_type === "undefined") setEnableClientFetchBoard(false);
    if (isMounted()) setEnableClientFetchBoard(true);
    return () => setEnableClientFetchBoard(false);
  }, [b_type]);

  return (
    <Page className="w-main w-full justify-start">
      <Head />
      <article className="mt-28 w-full w-bg-secondary rounded-lg shadow-lg">
        {!isMounted() ? (
          <FeedList
            useBoardDetail={{
              visible: true,
              boardDetail,
              enableClientFetchBoardDetail: false,
              key: b_type as string,
            }}
            initFeed={initFeed}
            searchParams={{
              boardType: b_type as string,
              sort: sort as string,
              catalogue: catalogue as string,
            }}
            queryKey={`${b_type}_feed_list_${sort}_${catalogue}`}
            useUpDown={
              status === "authenticated" ? { raw: raw as string } : undefined
            }
          />
        ) : (
          <FeedList
            searchParams={{
              boardType: b_type as string,
              sort: sort as string,
              catalogue: catalogue as string,
            }}
            initPage={1}
            queryKey={`${b_type}_feed_list_${sort}_${catalogue}`}
            useBoardDetail={{
              visible: true,
              boardDetail: enableClientFetchBoard ? undefined : boardDetail,
              enableClientFetchBoardDetail: enableClientFetchBoard,
              key: b_type as string,
            }}
            enableClientFetchFeedList={!b_type ? false : undefined}
            useUpDown={
              status === "authenticated" ? { raw: raw as string } : undefined
            }
          />
        )}
      </article>
    </Page>
  );
};

export default BPage;
