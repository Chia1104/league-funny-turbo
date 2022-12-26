import dynamic from "next/dynamic";
import Link from "next/link";
import { ChatIcon, EyeIcon } from "@wanin/icons";
import type { Feed } from "@wanin/shared/types";
import { Avatar } from "@/components";
import CommentList from "./CommentList";
import CommentBox from "./CommentBox";
import { type FC, useMemo } from "react";
import { useSession } from "next-auth/react";
import { ApiResponseStatus, type Comment } from "@wanin/shared/types";
import { fetchCommentList } from "@/helpers/api/routes/feed";
import { useInfiniteQuery } from "@tanstack/react-query";

const FeedWithHTML = dynamic(() => import("../FeedWithHTML"));
const Youtube = dynamic(() => import("../Youtube"));
const TwitchClip = dynamic(() => import("../TwitchClip"));
const PlayList = dynamic(() => import("../PlayList"));

interface Props {
  data: Feed;
}

const FeedDetail: FC<Props> = (props) => {
  const { data } = props;
  const { data: session } = useSession();

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
    isFetching: isLoading,
    isSuccess,
    refetch,
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
  });

  const _comments = useMemo(() => {
    if (!comments) return [];
    return comments.pages.flat();
  }, [comments]);

  return (
    <>
      <div className="w-full w-bg-secondary rounded-t-lg p-7 flex flex-col overflow-hidden">
        <h2 className="mb-7 text-3xl font-bold">{data.f_desc}</h2>
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
        <div className="w-full flex gap-3 mb-7">
          <div className="flex gap-1 items-center">
            <EyeIcon size="base" className="text-gray-500" />
            <p className="text-base">{data.f_views}</p>
          </div>
          <a href="#commentlist" className="flex gap-1 items-center">
            <ChatIcon size="base" className="text-gray-500" />
            <p className="text-base">{data.f_commentcount}</p>
          </a>
        </div>
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
          isLoading={isLoading}
          fid={data.fid}
          onReply={() => refetch()}
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
