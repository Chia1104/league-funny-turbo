import { z } from "zod";
import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { type Session } from "next-auth";
import { NewComment, type NewCommentRef } from "@/components/events";
import { useToasts } from "@geist-ui/core";
import { addNewComment } from "@/helpers/api/routes/feed";
import { type Feed } from "@wanin/shared/types";
import { IsLogin } from "@/components";
import type { Comment as CommentType } from "@wanin/shared/types";

interface Props {
  fid: Feed["fid"];
  feedTitle?: string;
  feedSubtitle?: string;
  session: Session | null;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  useMinified?: boolean;
  replyTo?: number;
  onSend?: (comment: CommentType) => void;
  noDrawer?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

interface CommentBoxRef {
  getValidity: () => boolean;
  getValues: () => string;
}

const messageSchema = z.string().min(5, "至少留言 5 個字哦");

const DrawerContent: FC<{
  session: Session | null;
  onImageUpload: (url?: string) => void;
  onTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  commentValue: string;
  placeholder?: string;
  isLoading?: boolean;
}> = ({
  session,
  onImageUpload,
  onTextareaChange,
  onFormSubmit,
  commentValue,
  placeholder,
  isLoading,
}) => {
  const drawerCommentRef = useRef<NewCommentRef>(null);
  return (
    <NewComment
      isLoading={isLoading}
      schema={messageSchema}
      ref={drawerCommentRef}
      userId={session?.user?.id}
      onImageUpload={onImageUpload}
      textareaProps={{
        className: "w-full h-[500px]",
        placeholder: placeholder ?? "留言",
        value: commentValue,
        onChange: onTextareaChange,
      }}
      formProps={{
        onSubmit: onFormSubmit,
      }}
    />
  );
};

const Comment = forwardRef<CommentBoxRef, Props>(
  (
    {
      noDrawer,
      fid,
      feedTitle,
      feedSubtitle,
      session,
      replyTo,
      onSend,
      placeholder = "留言",
    },
    ref
  ) => {
    const [commentValue, setCommentValue] = useState("");
    const [isOpened, setIsOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const commentRef = useRef<NewCommentRef>(null);
    const { setToast } = useToasts();

    useImperativeHandle(ref, () => ({
      getValidity: () => messageSchema.safeParse(commentValue).success,
      getValues: () => commentValue,
    }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const validation = messageSchema.safeParse(commentValue);
      if (!validation.success) {
        setToast({
          text: validation.error.issues[0].message,
          type: "warning",
        });
        setIsLoading(false);
        return;
      }
      const result = await addNewComment({
        fid,
        message: commentValue,
        parent: replyTo,
      });
      if (result.status !== "success") {
        setToast({
          text: result.message,
          type: "warning",
        });
        setIsLoading(false);
        return;
      }
      setCommentValue("");
      setIsOpened(false);
      commentRef.current?.getNativeForm()?.reset();
      setToast({
        text: `${placeholder}成功`,
        type: "success",
      });
      onSend && onSend(result.data as CommentType);
      setIsLoading(false);
    };
    return (
      <NewComment
        isLoading={isLoading}
        useMinified
        schema={messageSchema}
        ref={commentRef}
        onImageUpload={(url) => {
          setCommentValue((prevState) => prevState + `\n${url}\n`);
        }}
        useDrawer={
          !noDrawer
            ? {
                isOpen: isOpened,
                handleDrawer: () => setIsOpened((prevState) => !prevState),
                title: feedTitle,
                subtitle: feedSubtitle,
                content: (
                  <DrawerContent
                    isLoading={isLoading}
                    session={session}
                    onImageUpload={(url) =>
                      setCommentValue((prevState) => prevState + `\n${url}\n`)
                    }
                    onTextareaChange={(e) => setCommentValue(e.target.value)}
                    onFormSubmit={(e) => {
                      if (!isOpened) return;
                      handleSubmit(e);
                    }}
                    commentValue={commentValue}
                    placeholder={placeholder}
                  />
                ),
              }
            : undefined
        }
        userId={session?.user?.id}
        textareaProps={{
          placeholder: placeholder ?? "留言",
          value: commentValue,
          onChange: (e) => {
            setCommentValue(e.target.value);
          },
        }}
        formProps={{
          onSubmit: (e) => {
            if (isOpened) return;
            handleSubmit(e);
          },
        }}
      />
    );
  }
);
Comment.displayName = "Comment";

const CommentBox = forwardRef<CommentBoxRef, Props>(({ ...rest }, ref) => {
  const commentRef = useRef<CommentBoxRef>(null);
  useImperativeHandle(ref, () => ({
    getValidity: () => commentRef.current?.getValidity() ?? false,
    getValues: () => commentRef.current?.getValues() ?? "",
  }));
  return (
    <IsLogin fallBack={<p className="ml-10">登入後即可留言</p>}>
      <Comment {...rest} ref={commentRef} />
    </IsLogin>
  );
});
CommentBox.displayName = "CommentBox";

export default CommentBox;
