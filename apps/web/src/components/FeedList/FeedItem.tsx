import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import type { Feed } from "@wanin/types";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  feed: Feed;
}

const FeedItem: FC<Props> = ({ feed, ...rest }) => {
  return (
    <div {...rest}>
      <h1>{feed.f_desc}</h1>
      <p>{feed.f_attachment}</p>
    </div>
  );
};

export default FeedItem;
