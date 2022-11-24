"use client";

import { type FC, Ref, forwardRef, useState } from "react";
import type { Comment } from "@wanin/types";
import { Avatar } from "@/components";
import Link from "next/link";
import cx from "classnames";

interface Props {
  ref?: Ref<HTMLDivElement>;
  comment: Comment;
}

const CommentItem: FC<Props> = forwardRef((props, ref) => {
  const { comment } = props;
  const [isShowReply, setIsShowReply] = useState(false);

  return (
    <div ref={ref} className="w-full flex flex-col gap-3 p-5">
      <div className="w-full flex gap-3">
        <Avatar
          url={`https://img.league-funny.com/user_cover/${
            comment?.c_uid || ""
          }.jpg`}
          userId={comment?.c_uid}
          ratio={25}
          username={comment?.c_author_name}
        />
        <Link href={`/user/${comment?.c_uid}`} className="text-base">
          {comment?.c_author_name}
        </Link>
      </div>
      <div className="">{comment?.c_content}</div>
      {comment.reply.length !== 0 && (
        <button
          onClick={() => setIsShowReply(!isShowReply)}
          className={cx(
            "text-sm text-gray-500 self-end hover:w-bg-primary p-2 rounded-lg transition ease-in-out",
            isShowReply && "w-bg-primary"
          )}>
          有 {comment.reply.length} 則回覆
        </button>
      )}
      {isShowReply && (
        <>
          <hr className="dark:border-gray-700" />
          {comment.reply.map((item, i) => (
            <>
              <div key={item.c_uid} className="w-full flex flex-col gap-3 p-5">
                <div className="w-full flex gap-3">
                  <Avatar
                    url={`https://img.league-funny.com/user_cover/${
                      item?.c_uid || ""
                    }.jpg`}
                    userId={item?.c_uid}
                    ratio={25}
                    username={item?.c_author_name}
                  />
                  <Link href={`/user/${comment?.c_uid}`} className="text-base">
                    {item?.c_author_name}
                  </Link>
                </div>
                <div className="">{item?.c_content}</div>
              </div>
              {comment.reply.length !== i + 1 && (
                <hr className="dark:border-gray-700" />
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
});

CommentItem.displayName = "CommentItem";

export default CommentItem;
