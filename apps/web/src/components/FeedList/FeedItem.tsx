import { type FC, type Ref, forwardRef } from "react";
import type { Feed } from "@wanin/shared/types";
import { Image, Avatar } from "@/components";
import { GoldenIcon, ChatIcon, EyeIcon, UpIcon, DownIcon } from "@wanin/icons";
import Link from "next/link";
import cx from "classnames";
import { useMutation } from "@tanstack/react-query";
import { upDownFeed } from "@/helpers/api/routes/feed";
import { ApiResponseStatus } from "@wanin/shared/types";
import { useToasts, Spinner, Tooltip } from "@geist-ui/core";

interface Props {
  ref?: Ref<HTMLDivElement>;
  feed: Feed;
  useUpDown?: {
    raw: string;
  };
}

const upDownMutation = async ({
  raw,
  fid,
  type,
}: {
  raw: string;
  fid: number;
  type: "up" | "down";
}): Promise<{ count: number; coin: number }> => {
  const result = await upDownFeed({
    raw,
    fid,
    type,
  });
  if (
    result.statusCode !== 200 ||
    !result?.data ||
    result.status !== ApiResponseStatus.SUCCESS
  )
    throw new Error("error");
  return result.data;
};

const FeedItem: FC<Props> = forwardRef((props: Props, ref) => {
  const { feed, useUpDown } = props;
  const { setToast } = useToasts();
  const {
    mutate: upDownMutate,
    isLoading,
    isIdle,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: upDownMutation,
    mutationKey: ["upDown", useUpDown?.raw, feed?.fid],
    onSuccess: (data, variables) => {
      setToast({
        text:
          variables.type === "up"
            ? feed.up_down_text.b_up_text
            : feed.up_down_text.b_down_text,
        type: "success",
      });
    },
    onError: () => {
      setToast({
        text: "Error",
        type: "warning",
      });
    },
  });

  return (
    <>
      <div
        className={cx(
          "w-full flex group duration-300 transition ease-in-out relative",
          !!useUpDown ? "py-2 pr-2" : "p-3"
        )}
        ref={ref}>
        {!!useUpDown ? (
          <div className="flex flex-col w-[10%] md:w-[5%] min-h-[130px] justify-center items-center gap-10 border-r z-20">
            <Tooltip
              text={feed?.up_down_text?.b_up_text}
              enterDelay={0}
              leaveDelay={0}>
              <button
                className={cx(isLoading && "hover:cursor-no-drop")}
                disabled={isLoading}
                type="button"
                onClick={() =>
                  upDownMutate({
                    raw: useUpDown?.raw,
                    fid: feed.fid,
                    type: "up",
                  })
                }>
                <UpIcon />
              </button>
            </Tooltip>
            <p className="text-xl">
              {isIdle && feed?.up_down_count}
              {isSuccess && data.count}
              {isLoading && <Spinner />}
            </p>
            <Tooltip
              enterDelay={0}
              leaveDelay={0}
              text={feed?.up_down_text?.b_down_text}
              placement="bottom">
              <button
                disabled={isLoading}
                className={cx(isLoading && "hover:cursor-no-drop")}
                type="button"
                onClick={() =>
                  upDownMutate({
                    raw: useUpDown?.raw,
                    fid: feed.fid,
                    type: "down",
                  })
                }>
                <DownIcon />
              </button>
            </Tooltip>
          </div>
        ) : null}
        {feed?.f_cover && (
          <span className="w-[33%] flex items-center justify-center px-2">
            <div className="aspect-w-1 aspect-h-1 md:aspect-w-16 md:aspect-h-9 w-full overflow-hidden rounded">
              <Image
                blur
                src={feed?.f_cover || "/error/error-memoji.png"}
                alt={feed?.f_desc || "feed_cover"}
                className="object-cover rounded group-hover:scale-[1.05] duration-300 transition ease-in-out"
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
                quality={100}
              />
            </div>
          </span>
        )}
        <div
          className={cx(
            "flex flex-col min-h-[130px] pl-3",
            !!useUpDown ? "w-[62%]" : "w-[67%]"
          )}>
          <title className="line-clamp-2 text-xl font-bold">
            {feed?.f_desc}
          </title>
          <span className="mt-3 flex items-center gap-2 z-20 w-full">
            {feed?.f_is_gold === 1 && (
              <GoldenIcon size="base" className="text-warning" />
            )}
            <Avatar
              username={feed?.f_author_name || "user"}
              userId={feed?.f_uid}
              ratio={25}
            />
            <Link
              href={`/user/${feed?.f_uid}`}
              className="text-sm w-text-bg-info-half dark:w-text-bg-primary-half">
              {feed?.f_author_name as string}
            </Link>
          </span>
          <div className="w-full flex gap-3 mt-auto">
            <div className="flex gap-1 items-center">
              <EyeIcon size="small" className="text-gray-500" />
              <p className="text-sm">{feed?.f_views}</p>
            </div>
            <div className="flex gap-1 items-center">
              <ChatIcon size="small" className="text-gray-500" />
              <p className="text-sm">{feed?.f_commentcount}</p>
            </div>
          </div>
        </div>
        <Link
          className="absolute top-0 bottom-0 right-0 left-0 z-10"
          href={{
            pathname: "/b/[b_type]/f/[bc_id]",
            query: { b_type: feed?.f_game_type, bc_id: feed?.fid },
          }}
        />
      </div>
    </>
  );
});

FeedItem.displayName = "FeedItem";

export default FeedItem;
