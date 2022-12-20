"use client";

import { type FC, useMemo } from "react";
import type { Comment } from "@wanin/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommentList } from "@/helpers/api/routes/feed";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import { Virtuoso } from "react-virtuoso";
import { ApiResponseStatus } from "@wanin/shared/types";
import { useSession } from "next-auth/react";

interface Props {
  fid: number;
  count?: number;
}

const CommentList: FC<Props> = (props) => {
  const { fid, count } = props;
  const { data: session } = useSession();

  const fetcher = async ({ pageParam = 1 }): Promise<Comment[]> => {
    const result = await fetchCommentList({
      fid,
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
    error: isError,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetching: isLoading,
    isSuccess,
  } = useInfiniteQuery<Comment[]>({
    queryKey: ["comment", fid],
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
    <div className="flex flex-col space-y-2 mt-10">
      <p id="commentlist" className="text-xl">
        留言 ({count || 0}則)
      </p>
      {isSuccess && (
        <Virtuoso
          totalCount={_comments.length}
          data={_comments}
          overscan={100}
          endReached={() => fetchNextPage()}
          style={{ height: "100%" }}
          useWindowScroll
          itemContent={(index, item) => {
            return (
              <>
                <CommentItem comment={item} session={session} />
                {index !== _comments.length - 1 && (
                  <hr className="dark:border-gray-700" />
                )}
              </>
            );
          }}
        />
      )}
      {isLoading && <CommentSkeleton />}
    </div>
  );
};

export default CommentList;
