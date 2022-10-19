import { type FC, type Ref, forwardRef } from "react";
import type { Feed } from "@wanin/types";
import { Link } from "@/components";

interface Props {
  ref?: Ref<HTMLDivElement>;
  feed: Feed;
}

const FeedItem: FC<Props> = forwardRef((props: Props, ref) => {
  const { feed } = props;

  return (
    <div className="w-full" ref={ref}>
      <div className="w-full h-20 flex flex-col justify-center items-center">
        <h3>{feed.fid}</h3>
        <p>{feed.f_desc}</p>
        <Link
          href={{
            pathname: "/l/feed/[fid]",
            query: { fid: feed.fid },
          }}>
          <a>Go to feed detail</a>
        </Link>
      </div>
    </div>
  );
});

FeedItem.displayName = "FeedItem";

export default FeedItem;
