import { type FC, useRef, useCallback } from "react";
import type { Feed } from "@wanin/types";
import FeedItem from "./FeedItem";

interface Props {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onMoreFeed: () => void;
  hasMoreFeed: boolean;
  feed: Feed[];
}

const FeedList: FC<Props> = (props) => {
  const { isLoading, feed, hasMoreFeed, onMoreFeed, isError, isSuccess } =
    props;
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: any) => {
      if (isError || isLoading || !hasMoreFeed) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreFeed) onMoreFeed();
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreFeed, isError]
  );

  return (
    <div>
      {isSuccess && (
        <>
          {feed.map((item, index) => {
            feed.length === index + 1 ? (
              <FeedItem key={item.fid} ref={lastItemRef} feed={item} />
            ) : (
              <FeedItem key={item.fid} feed={item} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default FeedList;
