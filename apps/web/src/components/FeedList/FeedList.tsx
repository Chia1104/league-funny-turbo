import { type FC } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";
import { Virtuoso } from "react-virtuoso";

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
  // const { ref: lastItemRef } = useInfiniteScroll({
  //   isLoading,
  //   isError,
  //   hasMore: hasMoreFeed,
  //   onLoadMore: onMoreFeed,
  //   intersectionObserverInit: {
  //     rootMargin: "150px",
  //   },
  // });

  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      {isSuccess && (
        <>
          {/*{feed.map((item, index) => {*/}
          {/*  if (index === feed.length - 1) {*/}
          {/*    return <FeedItem key={item.fid} feed={item} ref={lastItemRef} />;*/}
          {/*  }*/}
          {/*  return (*/}
          {/*    <Fragment key={item.fid}>*/}
          {/*      <FeedItem feed={item} />*/}
          {/*      <hr className="dark:border-gray-700" />*/}
          {/*    </Fragment>*/}
          {/*  );*/}
          {/*})}*/}
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
                  <hr className="dark:border-gray-700" />
                </>
              );
            }}
          />
        </>
      )}
      {isLoading && (
        <div className="w-full flex group p-5 relative animate-pulse">
          <span className="w-[33%] mr-10">
            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded w-bg-primary" />
          </span>
          <div className="flex flex-col w-[67%]">
            <span className="w-full h-7 rounded w-bg-primary" />
            <span className="mt-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full w-bg-primary" />
              <span className="w-20 h-4 rounded w-bg-primary" />
            </span>
          </div>
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
