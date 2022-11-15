"use client";

import { type FC, Fragment, useMemo } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { useInfiniteScroll } from "@/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoreFeedList } from "@/helpers/api/client";
import { Virtuoso } from "react-virtuoso";

interface Props {
  queryKey?: string;
  initFeed: Feed[];
  searchParams?: Record<string, string>;
  experimental?: boolean;
  initPage?: number;
}

const FeedList: FC<Props> = (props) => {
  const {
    queryKey,
    experimental = false,
    initFeed,
    initPage = 2,
    searchParams,
  } = props;

  const fetcher = async ({ pageParam = initPage }): Promise<Feed[]> => {
    return (await fetchMoreFeedList({
      page: pageParam,
      searchParams,
    })) as Feed[];
  };

  const {
    data: feeds,
    error: isError,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetching: isLoading,
  } = useInfiniteQuery<Feed[]>({
    queryKey: [queryKey],
    queryFn: fetcher,
    initialData: {
      pages: [initFeed],
      pageParams: [initPage - 1],
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0 || !lastPage || lastPage.length < 20)
        return undefined;
      return pages.length + 1;
    },
  });

  const _feeds = useMemo(() => {
    if (!feeds) return [];
    return feeds.pages.flat();
  }, [feeds]);

  const { ref: lastItemRef } = useInfiniteScroll({
    isLoading,
    isError: isError as boolean,
    hasMore: hasMore as boolean,
    onLoadMore: fetchNextPage,
    intersectionObserverInit: {
      rootMargin: "150px",
    },
  });

  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      <>
        {experimental && (
          <>
            <Virtuoso
              totalCount={_feeds.length}
              data={_feeds}
              overscan={100}
              endReached={() => fetchNextPage()}
              style={{ height: "100%" }}
              useWindowScroll
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
          </>
        )}
        {!experimental && (
          <>
            {_feeds.map((item, index) => {
              if (index === _feeds.length - 1) {
                return (
                  <FeedItem key={item.fid} feed={item} ref={lastItemRef} />
                );
              }
              return (
                <Fragment key={item.fid}>
                  <FeedItem feed={item} />
                  <hr className="dark:border-gray-700" />
                </Fragment>
              );
            })}
          </>
        )}
        {isLoading && <FeedSkeleton />}
        {isError && (
          <div className="w-full h-20 flex justify-center items-center">
            <h3 className="text-warning">
              Something went wrong, please try again later.
            </h3>
          </div>
        )}
        {!hasMore && !isLoading && (
          <div className="w-full h-20 flex justify-center items-center">
            <h3 className="text-gray-400">沒更多文章囉</h3>
          </div>
        )}
      </>
    </div>
  );
};

export default FeedList;
