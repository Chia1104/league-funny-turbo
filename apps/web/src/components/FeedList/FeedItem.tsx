import { type FC, type Ref, forwardRef } from "react";
import type { Feed } from "@wanin/types";
import { Link, Image, Avatar } from "@/components";
import { GoldenIcon, ChatIcon, EyeIcon } from "@wanin/ui";

interface Props {
  ref?: Ref<HTMLDivElement>;
  feed: Feed;
}

const FeedItem: FC<Props> = forwardRef((props: Props, ref) => {
  const { feed } = props;

  return (
    <div
      className="w-full flex group duration-300 transition ease-in-out p-5 relative"
      ref={ref}>
      <div className="flex flex-col w-[67%] min-h-[130px] pr-5">
        <title className="line-clamp-2 text-xl font-bold">{feed.f_desc}</title>
        <span className="mt-3 flex items-center gap-2 z-10 w-full">
          {feed.f_is_gold === 1 && (
            <GoldenIcon size="base" className="text-warning" />
          )}
          <Avatar
            username={feed.f_author_name}
            url={`https://img.league-funny.com/user_cover/${feed.fid}.jpg`}
            ratio={25}
          />
          <Link href={`/user/${feed.f_uid}`}>
            <a className="text-sm w-text-bg-info-half dark:w-text-bg-primary-half">
              {feed.f_author_name as string}
            </a>
          </Link>
        </span>
        <div className="w-full flex gap-3 mt-auto">
          <div className="flex gap-1 items-center">
            <EyeIcon size="small" className="text-gray-500" />
            <p className="text-sm">{feed.f_views}</p>
          </div>
          <div className="flex gap-1 items-center">
            <ChatIcon size="small" className="text-gray-500" />
            <p className="text-sm">{feed.f_commentcount}</p>
          </div>
        </div>
      </div>
      <span className="w-[33%] flex items-center justify-center">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded">
          {feed.f_cover && (
            <Image
              src={feed.f_cover || "/error/error-memoji.png"}
              alt={feed.f_desc as string}
              className="object-cover rounded group-hover:scale-[1.05] duration-300 transition ease-in-out"
              loading="lazy"
              fill
              sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
              quality={100}
            />
          )}
        </div>
      </span>
      <Link
        href={{
          // pathname: "/l/[cat]/p/[fid]",
          // query: { cat: feed.f_game_type, fid: feed.fid },
          pathname: "/l/feed-ssr/[fid]",
          query: { fid: feed.fid },
        }}>
        <a className="absolute top-0 bottom-0 right-0 left-0" />
      </Link>
    </div>
  );
});

FeedItem.displayName = "FeedItem";

export default FeedItem;