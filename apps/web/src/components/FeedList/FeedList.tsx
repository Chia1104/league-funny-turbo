import { type FC } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";
import { useInfiniteScroll } from "@/hooks";

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
  const { ref: lastItemRef } = useInfiniteScroll({
    isLoading,
    isError,
    hasMore: hasMoreFeed,
    onLoadMore: onMoreFeed,
    intersectionObserverInit: {
      rootMargin: "150px",
    },
  });

  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      {isSuccess && (
        <>
          {feed.map((item, index) => {
            if (index === feed.length - 1) {
              return <FeedItem key={item.fid} feed={item} ref={lastItemRef} />;
            }
            return <FeedItem key={item.fid} feed={item} />;
          })}
        </>
      )}
      {isLoading && (
        <div className="w-full h-20 flex justify-center items-center">
          <div className="w-10 h-10 border-2 border-gray-300 rounded-full animate-spin" />
        </div>
      )}
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
