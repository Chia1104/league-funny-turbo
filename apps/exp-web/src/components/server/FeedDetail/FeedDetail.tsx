import dynamic from "next/dynamic";
import Link from "next/link";
import { ChatIcon, EyeIcon } from "@/lib/ui";
import type { Feed } from "@wanin/types";
import { Avatar, CommentList } from "@/components/client";
import { type FC } from "react";

const FeedWithHTML = dynamic(() => import("../../client/FeedWithHTML"));
const Youtube = dynamic(() => import("../Youtube"));
const TwitchClip = dynamic(() => import("../TwitchClip"));
const PlayList = dynamic(() => import("../PlayList"));

interface Props {
  data: Feed;
}

const FeedDetail: FC<Props> = (props) => {
  const { data } = props;

  return (
    <div className="w-full w-bg-secondary rounded-lg p-7 flex flex-col overflow-hidden">
      <h2 className="mb-7 text-3xl font-bold">{data.f_desc}</h2>
      <div className="mb-5 flex items-center">
        <Avatar
          username={data.f_author_name}
          userId={data.f_uid}
          ratio={45}
          url={`https://img.league-funny.com/user_cover/${data.f_uid}.jpg`}
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
      <hr className="dark:border-gray-700" />
      <CommentList fid={data.fid} count={data.f_commentcount} />
    </div>
  );
};

export default FeedDetail;
