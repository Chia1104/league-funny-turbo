import dynamic from "next/dynamic";
import Link from "next/link";
import { ChatIcon, EyeIcon } from "@wanin/icons";
import type { Feed } from "@wanin/shared/types";
import { Avatar, CommentList, IsLogin } from "@/components";
import {
  type FC,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { NewComment, type NewCommentRef } from "@/components/events";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { z } from "zod";

const FeedWithHTML = dynamic(() => import("../FeedWithHTML"));
const Youtube = dynamic(() => import("../Youtube"));
const TwitchClip = dynamic(() => import("../TwitchClip"));
const PlayList = dynamic(() => import("../PlayList"));

interface Props {
  data: Feed;
}

const DrawerContent: FC<{
  session: Session | null;
  onImageUpload: (url?: string) => void;
  onTextareaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFormSubmit: (e: FormEvent) => void;
  commentValue: string;
}> = ({
  session,
  onImageUpload,
  onTextareaChange,
  onFormSubmit,
  commentValue,
}) => {
  const drawerCommentRef = useRef<NewCommentRef>(null);
  return (
    <NewComment
      schema={z.string().min(1, "Comment is required")}
      ref={drawerCommentRef}
      userId={session?.user?.id}
      onImageUpload={onImageUpload}
      textareaProps={{
        className: "w-full min-h-[500px]",
        placeholder: "留言",
        value: commentValue,
        onChange: onTextareaChange,
      }}
      formProps={{
        onSubmit: onFormSubmit,
      }}
    />
  );
};

const Comment: FC<Props & { session: Session | null }> = ({
  data,
  session,
}) => {
  const [commentValue, setCommentValue] = useState("");
  const commentRef = useRef<NewCommentRef>(null);

  const handleSubmit = () => {
    console.log("submit", commentValue);
  };
  return (
    <NewComment
      schema={z.string().min(1, "Comment is required")}
      ref={commentRef}
      onImageUpload={(url) => {
        setCommentValue((prevState) => prevState + `\n${url}\n`);
      }}
      useDrawer={{
        title: data.f_desc,
        subtitle: data.f_author_name,
        content: (
          <DrawerContent
            session={session}
            onImageUpload={(url) =>
              setCommentValue((prevState) => prevState + `\n${url}\n`)
            }
            onTextareaChange={(e) => setCommentValue(e.target.value)}
            onFormSubmit={(e) => {
              e.preventDefault();
              if (commentRef.current && !commentRef.current.isDrawerOpen()) {
                return;
              }
              handleSubmit();
            }}
            commentValue={commentValue}
          />
        ),
      }}
      userId={session?.user?.id}
      textareaProps={{
        placeholder: "留言",
        value: commentValue,
        onChange: (e) => {
          setCommentValue(e.target.value);
        },
      }}
      formProps={{
        onSubmit: (e) => {
          e.preventDefault();
          if (commentRef.current && commentRef.current.isDrawerOpen()) {
            return;
          }
          handleSubmit();
        },
      }}
    />
  );
};

const FeedDetail: FC<Props> = (props) => {
  const { data } = props;
  const { data: session } = useSession();

  return (
    <div className="w-full w-bg-secondary rounded-lg p-7 flex flex-col overflow-hidden">
      <h2 className="mb-7 text-3xl font-bold">{data.f_desc}</h2>
      <div className="mb-5 flex items-center">
        <Avatar username={data.f_author_name} userId={data.f_uid} ratio={45} />
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
      <IsLogin fallBack={<p>登入後即可留言</p>}>
        <Comment data={data} session={session} />
      </IsLogin>
      <CommentList fid={data.fid} count={data.f_commentcount} />
    </div>
  );
};

export default FeedDetail;
