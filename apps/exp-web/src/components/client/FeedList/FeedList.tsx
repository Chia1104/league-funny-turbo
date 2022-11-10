"use client";

import { type FC, Fragment } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";
import FeedSkeleton from "./FeedSkeleton";
import { useInfiniteScroll } from "@/hooks";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoreFeedList } from "@/helpers/api/client";

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
      if (lastPage.length === 0 || !lastPage) return undefined;
      return pages.length + 1;
    },
  });

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
        {/*{experimental && (*/}
        {/*  <>*/}
        {/*    <Virtuoso*/}
        {/*      totalCount={feeds.length}*/}
        {/*      data={feeds}*/}
        {/*      overscan={100}*/}
        {/*      endReached={() => hasMore && setPage((prev) => prev + 1)}*/}
        {/*      style={{ height: "100%" }}*/}
        {/*      useWindowScroll*/}
        {/*      itemContent={(index, item) => {*/}
        {/*        return (*/}
        {/*          <>*/}
        {/*            <FeedItem feed={item} />*/}
        {/*            {index !== feeds.length - 1 && (*/}
        {/*              <hr className="dark:border-gray-700" />*/}
        {/*            )}*/}
        {/*          </>*/}
        {/*        );*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}
        {!experimental && (
          <>
            {(feeds as InfiniteData<Feed[]>).pages.map((group, index) => (
              <>
                <Fragment key={index}>
                  {group.map((item, i) => {
                    if (i === group.length - 1) {
                      return (
                        <FeedItem
                          key={item.fid}
                          feed={item}
                          ref={lastItemRef}
                        />
                      );
                    }
                    return (
                      <Fragment key={item.fid}>
                        <FeedItem feed={item} />
                        <hr className="dark:border-gray-700" />
                      </Fragment>
                    );
                  })}
                </Fragment>
                <hr className="dark:border-gray-700" />
              </>
            ))}
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
      </>
    </div>
  );
};

export default FeedList;
