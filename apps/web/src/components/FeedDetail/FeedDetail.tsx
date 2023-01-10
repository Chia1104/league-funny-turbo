import dynamic from "next/dynamic";
import Link from "next/link";
import { ChatIcon, DownIcon, EyeIcon, UpIcon } from "@wanin/icons";
import type { Feed } from "@wanin/shared/types";
import { Avatar, IsLogin } from "@/components";
import CommentList from "./CommentList";
import CommentBox from "./CommentBox";
import { type FC, useMemo, useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ApiResponseStatus, type Comment } from "@wanin/shared/types";
import {
  fetchCommentList,
  deleteFeed,
  upDownFeed,
} from "@/helpers/api/routes/feed";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Popover, Button, useToasts, Spinner } from "@geist-ui/core";
import { useToken } from "@/hooks";
import { TagItem } from "@/components";
import cx from "classnames";

const FeedWithHTML = dynamic(() => import("../FeedWithHTML"));
const Youtube = dynamic(() => import("../Youtube"));
const TwitchClip = dynamic(() => import("../TwitchClip"));
const PlayList = dynamic(() => import("../PlayList"));

interface Props {
  data: Feed;
  raw?: string;
  useWindowScroll?: boolean;
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

const FeedDetail: FC<Props> = (props) => {
  const { data, raw, useWindowScroll, useUpDown } = props;
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { setToast } = useToasts();
  const { raw: tokenRaw } = useToken();
  const parentRef = useRef<HTMLDivElement>(null);
  const [parent, setParent] = useState<HTMLDivElement | null>(null);
  const {
    mutate: upDownMutate,
    isLoading: upDownLoading,
    isIdle: upDownIdle,
    data: upDownData,
    isSuccess: upDownSuccess,
  } = useMutation({
    mutationFn: upDownMutation,
    mutationKey: ["upDown", useUpDown?.raw, data?.fid],
    onSuccess: (tdata, variables) => {
      setToast({
        text:
          variables.type === "up"
            ? data.up_down_text.b_up_text
            : data.up_down_text.b_down_text,
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

  useEffect(() => {
    setParent(parentRef.current);
    return () => {
      setParent(null);
    };
  }, []);

  const handleDelete = async (fid: number) => {
    setIsDeleting(true);
    const result = await deleteFeed({ raw: raw ?? tokenRaw ?? "", fid });
    if (result.status === ApiResponseStatus.SUCCESS) {
      setToast({
        text: "刪除成功",
        type: "success",
      });
      await router.push(`/b/${data.f_game_type}`);
      return;
    }
    setToast({
      text: "刪除失敗",
      type: "warning",
    });
    setIsDeleting(false);
  };

  const CheckDelete = ({ fid }: { fid: number }) => {
    return (
      <div className="flex justify-center items-center px-3">
        <div className="text-center">
          <p>確定要刪除這篇文章嗎？</p>
          <div className="flex justify-center items-center mt-4 gap-5">
            <Button
              loading={isDeleting}
              type="error"
              ghost
              auto
              scale={0.7}
              onClick={() => handleDelete(fid)}>
              確定
            </Button>
            <Button
              loading={isDeleting}
              type="secondary"
              ghost
              auto
              scale={0.7}>
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const fetcher = async ({ pageParam = 1 }): Promise<Comment[]> => {
    const result = await fetchCommentList({
      fid: data.fid,
      page: pageParam,
    });
    if (
      result.statusCode !== 200 ||
      !result?.data?.data ||
      result.status !== ApiResponseStatus.SUCCESS
    )
      throw new Error("error");
    return result.data.data;
  };

  const {
    data: comments,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    refetch,
    isInitialLoading,
  } = useInfiniteQuery<Comment[]>({
    queryKey: ["comment", data.fid],
    queryFn: fetcher,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0 || !lastPage || lastPage.length < 20)
        return undefined;
      return pages.length + 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60,
  });

  const _comments = useMemo(() => {
    if (!comments) return [];
    return comments.pages.flat();
  }, [comments]);

  return (
    <>
      <div
        className="w-full w-bg-secondary rounded-t-lg p-7 flex flex-col overflow-x-hidden"
        ref={parentRef}>
        <h2 className="mb-3 text-3xl font-bold">{data.f_desc}</h2>
        <IsLogin
          customRule={(session) => {
            if (!session) return false;
            if (session.user.admin_id > 0) return true;
            return session.user.id === data.f_uid.toString();
          }}>
          <span className="flex gap-3 md:mb-7">
            <Link
              href={`/b/${data.f_game_type}/f/${data.fid}/edit`}
              className="text-sm text-gray-500 self-end hover:w-bg-primary p-2 rounded-lg transition ease-in-out">
              編輯
            </Link>
            <Popover content={<CheckDelete fid={data.fid} />}>
              <button
                type={"button"}
                className="text-sm text-gray-500 self-end hover:w-bg-primary p-2 rounded-lg transition ease-in-out">
                刪除
              </button>
            </Popover>
          </span>
        </IsLogin>
        <div className="grid w-full items-center grid-cols-1 md:grid-cols-2 mb-5 md:mb-7">
          <div className="flex flex-col">
            <div className="mb-5 flex items-center">
              <Avatar
                username={data.f_author_name}
                userId={data.f_uid}
                ratio={45}
              />
              <Link href={`/user/${data.f_uid}`} className="ml-3 text-base">
                {data.f_author_name}
              </Link>
            </div>
            <div className="w-full flex gap-3">
              <div className="flex gap-1 items-center">
                <EyeIcon size="base" className="text-gray-500" />
                <p className="text-base">{data.f_views}</p>
              </div>
              <a href="#commentlist" className="flex gap-1 items-center">
                <ChatIcon size="base" className="text-gray-500" />
                <p className="text-base">{data.f_commentcount}</p>
              </a>
            </div>
          </div>
          {!!useUpDown ? (
            <div className="flex flex-col justify-center items-center justify-self-center md:justify-self-end">
              <p className="text-2xl mb-3">
                {upDownIdle && data?.up_down_count}
                {upDownSuccess && upDownData?.count}
                {upDownLoading && <Spinner />}
              </p>
              <div className="flex gap-5">
                <button
                  className={cx(
                    "p-2 rounded-lg w-bg-primary w-border-primary flex gap-2 items-center",
                    upDownLoading && "hover:cursor-no-drop"
                  )}
                  disabled={upDownLoading}
                  type="button"
                  onClick={() =>
                    upDownMutate({
                      raw: useUpDown?.raw,
                      fid: data.fid,
                      type: "up",
                    })
                  }>
                  <UpIcon />
                  <p className="text-base">{data.up_down_text.b_up_text}</p>
                </button>
                <button
                  disabled={upDownLoading}
                  className={cx(
                    "p-2 rounded-lg w-bg-primary w-border-primary flex gap-2 items-center",
                    upDownLoading && "hover:cursor-no-drop"
                  )}
                  type="button"
                  onClick={() =>
                    upDownMutate({
                      raw: useUpDown?.raw,
                      fid: data.fid,
                      type: "down",
                    })
                  }>
                  <DownIcon />
                  <p className="text-base">{data.up_down_text.b_down_text}</p>
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {data?.f_tags_info && data?.f_tags_info?.length > 0 && (
          <div className="w-full flex gap-3 mb-7 flex-wrap items-center">
            {data?.f_tags_info.map((tag) => (
              <TagItem label={tag.p_name} key={tag.pid} />
            ))}
          </div>
        )}
        <hr className="dark:border-gray-700 mb-7" />
        <div className="mb-3">
          {data.f_type === "html" && (
            <FeedWithHTML htmlSource={data.f_attachment} />
          )}
          {data.f_type === "article" && (
            <FeedWithHTML htmlSource={data.f_attachment} />
          )}
          {data.f_type === "youtube" && (
            <>
              {JSON.parse(data.f_attachment).map((item: any) => (
                <Youtube
                  key={item.object_id}
                  objectID={item.object_id}
                  ytTitle={data.f_desc}
                />
              ))}
            </>
          )}
          {data.f_type === "twitch_clip" && (
            <>
              {JSON.parse(data.f_attachment).map((item: any) => (
                <TwitchClip key={item.video_url} objectId={item.object_id} />
              ))}
            </>
          )}
          {data.f_type === "playlist" && (
            <PlayList attachment={data.f_attachment} />
          )}
        </div>
        <hr className="dark:border-gray-700 mb-10" />
        <CommentList
          comment={_comments}
          count={data.f_commentcount}
          session={session}
          isSuccess={isSuccess}
          endReached={fetchNextPage}
          isLoading={isFetchingNextPage || isInitialLoading}
          fid={data.fid}
          onReply={() => refetch()}
          useWindowScroll={useWindowScroll}
          customScrollParent={parent as HTMLElement}
        />
      </div>
      <div className="sticky rounded-b-lg bottom-0 right-0 left-0 w-bg-secondary min-h-[60px] flex items-center p-1">
        <CommentBox
          fid={data.fid}
          feedTitle={data.f_desc}
          feedSubtitle={data.f_author_name}
          session={session}
          onSend={() => refetch()}
        />
      </div>
    </>
  );
};

export default FeedDetail;
