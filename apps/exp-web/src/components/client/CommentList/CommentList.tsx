"use client";

import { type FC, Fragment } from "react";
import type { Comment } from "@wanin/types";
import { useInfiniteScroll } from "@/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommentList } from "@/helpers/api/client";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

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

  const { ref: lastItemRef } = useInfiniteScroll({
    isLoading,
    isError: isError as boolean,
    hasMore: hasMore as boolean,
    onLoadMore: fetchNextPage,
    intersectionObserverInit: {
      rootMargin: "150px",
    },
  });

  return (
    <div className="flex flex-col space-y-2 mt-10">
      <p id="commentlist" className="text-xl">
        留言 ({count || 0}則)
      </p>
      {comments?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.map((comment, i) => (
            <>
              <CommentItem
                key={i}
                comment={comment}
                ref={i === page.length - 1 ? lastItemRef : undefined}
              />
              <hr className="dark:border-gray-700" />
            </>
          ))}
        </Fragment>
      ))}
      {isLoading && <CommentSkeleton />}
      {!hasMore && !isLoading && <p className="py-5">沒更多留言囉</p>}
    </div>
  );
};

export default CommentList;
