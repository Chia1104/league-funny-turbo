import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { type Feed, type Pagenate, type Board } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList, fetchFeedBoardDetail } from "@/helpers/api/routes/feed";
import { ApiResponseStatus } from "@wanin/shared/types";
import { useAppSelector } from "@/hooks/useAppSelector";
import { rootStateSelector } from "@/store/reducers/root-state";

interface FeedProps {
  boardDetail: Board;
  initFeed: Pagenate<Feed[]>;
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
  const { b_type, sort, catalogue } = router.query;
  const { initFeed, boardDetail } = props;
  const rootState = useAppSelector(rootStateSelector);

  return (
    <Page className="w-main w-full justify-start">
      <Head />
      <article className="mt-28 w-full w-bg-secondary rounded-lg shadow-lg">
        {!rootState.app.isMounted ? (
          <FeedList
            boardDetail={boardDetail}
            useBoardDetail
            initFeed={initFeed.data}
            searchParams={{
              boardType: b_type as string,
              sort: sort as string,
              catalogue: catalogue as string,
            }}
            queryKey={`${b_type}_feed_list_${sort}_${catalogue}`}
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
            enableClientFetchBoardDetail
          />
        )}
      </article>
    </Page>
  );
};

export default BPage;
