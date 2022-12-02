"use client";

import { type FC, useMemo } from "react";
import type { Comment } from "@wanin/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommentList } from "@/helpers/api/client";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import { Virtuoso } from "react-virtuoso";

interface Props {
  fid: number;
  count?: number;
}

const CommentList: FC<Props> = (props) => {
  const { fid, count } = props;

  const fetcher = async ({ pageParam = 1 }): Promise<Comment[]> => {
    return (await fetchCommentList({
      fid,
      page: pageParam,
    })) as unknown as Comment[];
  };

  const {
    data: comments,
    error: isError,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetching: isLoading,
  } = useInfiniteQuery<Comment[]>({
    queryKey: ["comment", fid],
    queryFn: fetcher,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0 || !lastPage || lastPage.length < 20)
        return undefined;
      return pages.length + 1;
    },
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
              <CommentItem comment={item} />
              {index !== _comments.length - 1 && (
                <hr className="dark:border-gray-700" />
              )}
            </>
          );
        }}
      />
      {isLoading && <CommentSkeleton />}
      {!hasMore && !isLoading && <p className="py-5">沒更多留言囉</p>}
    </div>
  );
};

export default CommentList;
