"use client";

import { type FC, useState, Fragment } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";
import { Virtuoso } from "react-virtuoso";
import FeedSkeleton from "./FeedSkeleton";
import { useInfiniteScroll, experimental_useInfiniteQuery } from "@/hooks";
import { getBaseUrl } from "@/utils/get-base-url";

interface Props {
  initFeed: Feed[];
  searchParams?: Record<string, string>;
  experimental?: boolean;
  initPage?: number;
}

const FeedList: FC<Props> = (props) => {
  const { experimental = false, initFeed, initPage = 1, searchParams } = props;

  const [page, setPage] = useState(initPage);
  const {
    data: feeds,
    isLoading,
    isError,
    hasMore,
    isSuccess,
  } = experimental_useInfiniteQuery<Feed>({
    url: `${getBaseUrl()}/api/feed`,
    initData: initFeed,
    page,
    searchParams,
  });

  const { ref: lastItemRef } = useInfiniteScroll({
    isLoading,
    isError,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
    intersectionObserverInit: {
      rootMargin: "150px",
    },
  });

  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      {experimental && (
        <>
          <Virtuoso
            totalCount={feeds.length}
            data={feeds}
            overscan={100}
            endReached={() => hasMore && setPage((prev) => prev + 1)}
            style={{ height: "100%" }}
            useWindowScroll
            itemContent={(index, item) => {
              return (
                <>
                  <FeedItem feed={item} />
                  {index !== feeds.length - 1 && (
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
          {feeds.map((item, index) => {
            if (index === feeds.length - 1) {
              return <FeedItem key={item.fid} feed={item} ref={lastItemRef} />;
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
    </div>
  );
};

export default FeedList;
