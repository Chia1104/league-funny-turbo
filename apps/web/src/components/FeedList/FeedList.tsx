import { type FC, type Key, useMemo } from "react";
import type { Feed, Board } from "@wanin/shared/types";
import { ApiResponseStatus } from "@wanin/shared/types";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchFeedList, fetchFeedBoardDetail } from "@/helpers/api/routes/feed";
import { Virtuoso } from "react-virtuoso";
import { useRouter } from "next/router";
import BoardDetail from "@/components/FeedList/BoardDetail";

interface Props {
  queryKey?: string;
  initFeed?: Feed[];
  searchParams?: Partial<Record<string, string>>;
  experimental?: boolean;
  initPage?: number;
  useBoardDetail?: {
    visible?: boolean;
    boardDetail?: Board;
    enableClientFetchBoardDetail?: boolean;
    key?: Key;
  };
  enableClientFetchFeedList?: boolean;
  useUpDown?: {
    raw: string;
  };
}

const FeedList: FC<Props> = (props) => {
  const {
    queryKey,
    experimental,
    initFeed,
    initPage = 2,
    searchParams,
    useBoardDetail,
    enableClientFetchFeedList,
    useUpDown,
  } = props;
  const router = useRouter();

  const feedFetcher = async ({ pageParam = initPage }): Promise<Feed[]> => {
    const result = await fetchFeedList({
      page: pageParam,
      searchParams,
    });
    if (
      result.statusCode !== 200 ||
      !result?.data?.data ||
      result.status !== ApiResponseStatus.SUCCESS
    )
      throw new Error("error");
    return result.data.data;
  };

  const boardFetcher = async (): Promise<Board> => {
    const result = await fetchFeedBoardDetail({
      b_type: router.query.b_type as string,
    });
    if (
      result.statusCode !== 200 ||
      !result?.data ||
      result.status !== ApiResponseStatus.SUCCESS
    )
      throw new Error("error");
    return result.data;
  };

  const {
    data: feeds,
    error: isError,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetchingNextPage,
    isSuccess,
    isInitialLoading,
    isFetching: isFeedLoading,
  } = useInfiniteQuery<Feed[]>({
    queryKey: [queryKey],
    queryFn: feedFetcher,
    initialData: initFeed && {
      pages: [initFeed],
      pageParams: [initPage - 1],
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0 || !lastPage || lastPage.length < 20)
        return undefined;
      return pages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    enabled: enableClientFetchFeedList,
  });

  const { data: board, isInitialLoading: isBoardLoading } = useQuery<Board>({
    queryKey: ["board", router.query.b_type],
    queryFn: boardFetcher,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: useBoardDetail?.boardDetail,
    enabled: !!useBoardDetail?.enableClientFetchBoardDetail,
    staleTime: 1000 * 60 * 5,
  });

  const _feeds = useMemo(() => {
    if (!feeds) return [];
    return feeds.pages.flat();
  }, [feeds]);

  return (
    <>
      {useBoardDetail?.visible && (
        <>
          {!useBoardDetail?.enableClientFetchBoardDetail ? (
            <BoardDetail
              key={useBoardDetail?.key}
              boardDetail={useBoardDetail?.boardDetail}
              isFeedLoading={isFeedLoading}
              isBoardLoading={isBoardLoading}
            />
          ) : (
            <BoardDetail
              key={useBoardDetail?.key}
              boardDetail={board}
              isFeedLoading={isFeedLoading}
              isBoardLoading={isBoardLoading}
            />
          )}
        </>
      )}
      {isSuccess && (
        <Virtuoso
          totalCount={_feeds.length}
          data={_feeds}
          overscan={{
            main: 1000,
            reverse: 700,
          }}
          endReached={() => fetchNextPage()}
          style={{
            height: `${
              !hasMore && !isFetchingNextPage && !isInitialLoading ? 0 : "100%"
            }`,
          }}
          useWindowScroll
          initialItemCount={19}
          itemContent={(index, item) => {
            return (
              <>
                <FeedItem
                  feed={item}
                  useUpDown={!!useUpDown ? { raw: useUpDown.raw } : undefined}
                />
                {index !== _feeds.length - 1 && (
                  <hr className="dark:border-gray-700" />
                )}
              </>
            );
          }}
        />
      )}
      {(isFetchingNextPage || isInitialLoading) && <FeedSkeleton />}
      {isError && (
        <div className="w-full h-20 flex justify-center items-center">
          <h3 className="text-warning">
            Something went wrong, please try again later.
          </h3>
        </div>
      )}
      {!hasMore && !isFetchingNextPage && !isInitialLoading && (
        <div className="w-full h-20 flex justify-center items-center">
          <h3 className="text-gray-400">沒更多文章囉</h3>
        </div>
      )}
    </>
  );
};

export default FeedList;
