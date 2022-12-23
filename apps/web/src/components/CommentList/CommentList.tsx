import { type FC } from "react";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import { Virtuoso } from "react-virtuoso";
import { Comment } from "@wanin/shared/types";
import { Session } from "next-auth";

interface Props {
  comment: Comment[];
  count?: number;
  endReached: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  session: Session | null;
  fid: number;
  onReply?: (comment: Comment) => void;
}

const CommentList: FC<Props> = (props) => {
  const {
    comment,
    count,
    endReached,
    isLoading,
    isSuccess,
    session,
    fid,
    onReply,
  } = props;

  return (
    <div className="flex flex-col space-y-2 mt-10">
      <p id="commentlist" className="text-xl">
        留言 ({count || 0}則)
      </p>
      {isSuccess && (
        <Virtuoso
          totalCount={comment.length}
          data={comment}
          overscan={100}
          endReached={endReached}
          style={{ height: "100%" }}
          useWindowScroll
          itemContent={(index, item) => {
            return (
              <>
                <CommentItem
                  comment={item}
                  session={session}
                  fid={fid}
                  onReply={onReply}
                />
                {index !== comment.length - 1 && (
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
