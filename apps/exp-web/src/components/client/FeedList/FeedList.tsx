"use client";

import { type FC } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";
import { Virtuoso } from "react-virtuoso";
import FeedSkeleton from "./FeedSkeleton";

interface Props {
  isLoading?: boolean;
  isSuccess: boolean;
  isError?: boolean;
  onMoreFeed: () => void;
  hasMoreFeed: boolean;
  feed: Feed[];
}

const FeedList: FC<Props> = (props) => {
  const {
    isLoading = false,
    feed,
    hasMoreFeed,
    onMoreFeed,
    isError,
    isSuccess,
  } = props;

  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      {isSuccess && (
        <>
          <Virtuoso
            totalCount={feed.length}
            data={feed}
            overscan={100}
            endReached={onMoreFeed}
            style={{ height: "100%" }}
            useWindowScroll
            itemContent={(index, item) => {
              return (
                <>
                  <FeedItem feed={item} />
                  {index !== feed.length - 1 && (
                    <hr className="dark:border-gray-700" />
                  )}
                </>
              );
            }}
          />
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
