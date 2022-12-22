import { type FC, Ref, forwardRef, useState } from "react";
import type { Comment } from "@wanin/shared/types";
import { Avatar, CommentBox } from "@/components";
import Link from "next/link";
import cx from "classnames";
import { type Session } from "next-auth";
import { Popover, Button } from "@geist-ui/core";
import style from "./style.module.css";

interface Props {
  ref?: Ref<HTMLDivElement>;
  comment: Comment;
  session: Session | null;
  fid: number;
  onReply?: (comment: Comment) => void;
}

const CommentItem: FC<Props> = forwardRef((props, ref) => {
  const { comment, session, fid, onReply } = props;
  const [isShowReply, setIsShowReply] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const CheckDelete = () => {
    return (
      <div className="flex justify-center items-center px-3">
        <div className="text-center">
          <p>確定要刪除這則留言嗎？</p>
          <div className="flex justify-center items-center mt-4 gap-5">
            <Button
              type="error"
              ghost
              auto
              scale={0.7}
              onClick={() => setIsDelete(true)}>
              確定
            </Button>
            <Button
              type="secondary"
              ghost
              auto
              scale={0.7}
              onClick={() => setIsDelete(false)}>
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="w-full flex flex-col gap-3 p-5">
      <div className="w-full flex gap-3 items-center">
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
        {(session?.user?.id === comment?.c_uid.toString() ||
          session?.user?.admin_id === 1) &&
          !isDelete && (
            <Popover content={CheckDelete}>
              <button
                className={cx(
                  "text-sm text-gray-500 self-end hover:bg-red-400 hover:text-white p-2 rounded-lg transition ease-in-out"
                )}>
                刪除
              </button>
            </Popover>
          )}
        {isDelete && <p className="text-red-300">(這則留言以被刪除)</p>}
      </div>
      <div
        className={cx(
          isDelete && "line-through text-red-300",
          comment.c_displayorder < 0 && "text-red-300"
        )}>
        <div
          className={style.frView}
          dangerouslySetInnerHTML={{
            __html: comment.c_content,
          }}
        />
      </div>
      <span className="flex gap-2 self-end items-center">
        {comment.reply.length !== 0 && (
          <p className="text-sm text-gray-500">
            有 {comment.reply.length} 則回覆
          </p>
        )}
        <button
          onClick={() => setIsShowReply(!isShowReply)}
          className={cx(
            "text-sm text-gray-500 self-end hover:w-bg-primary p-2 rounded-lg transition ease-in-out",
            isShowReply && "w-bg-primary"
          )}>
          <p>回覆</p>
        </button>
      </span>
      {isShowReply && (
        <CommentBox
          fid={fid}
          noDrawer
          session={session}
          onSend={onReply}
          replyTo={comment.c_id}
        />
      )}
      <div className="w-bg-primary rounded-lg">
        {comment.reply.map((item, i) => (
          <>
            <div key={item.c_uid} className="w-full flex flex-col gap-3 p-5">
              <div className="w-full flex gap-3 items-center">
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
                {(session?.user?.id === comment?.c_uid.toString() ||
                  session?.user?.admin_id === 1) && (
                  <button
                    className={cx(
                      "text-sm text-gray-500 self-end hover:w-bg-primary p-2 rounded-lg transition ease-in-out"
                    )}>
                    刪除
                  </button>
                )}
              </div>
              <div
                className={style.frView}
                dangerouslySetInnerHTML={{
                  __html: item.c_content,
                }}
              />
            </div>
            {comment.reply.length !== i + 1 && (
              <hr className="dark:border-gray-700" />
            )}
          </>
        ))}
      </div>
    </div>
  );
});

CommentItem.displayName = "CommentItem";

export default CommentItem;
