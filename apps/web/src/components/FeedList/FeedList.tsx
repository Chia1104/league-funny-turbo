import { type FC, useMemo } from "react";
import type { Feed } from "@wanin/shared/types";
import { ApiResponseStatus } from "@wanin/shared/types";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeedList } from "@/helpers/api/routes/feed";
import { Virtuoso } from "react-virtuoso";

interface Props {
  queryKey?: string;
  initFeed?: Feed[];
  searchParams?: Record<string, string>;
  experimental?: boolean;
  initPage?: number;
}

const FeedList: FC<Props> = (props) => {
  const {
    queryKey,
    experimental,
    initFeed,
    initPage = 2,
    searchParams,
  } = props;

  const fetcher = async ({ pageParam = initPage }): Promise<Feed[]> => {
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

  const {
    data: feeds,
    error: isError,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetchingNextPage,
    isSuccess,
    isInitialLoading,
  } = useInfiniteQuery<Feed[]>({
    queryKey: [queryKey],
    queryFn: fetcher,
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
  });

  const _feeds = useMemo(() => {
    if (!feeds) return [];
    return feeds.pages.flat();
  }, [feeds]);

  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      <>
        {isSuccess && (
          <Virtuoso
            totalCount={_feeds.length}
            data={_feeds}
            overscan={{
              main: 1000,
              reverse: 700,
            }}
            endReached={() => fetchNextPage()}
            style={{ height: "100%" }}
            useWindowScroll
            initialItemCount={19}
            itemContent={(index, item) => {
              return (
                <>
                  <FeedItem feed={item} />
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
    </div>
  );
};

export default FeedList;
