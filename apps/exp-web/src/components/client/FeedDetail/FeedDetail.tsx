"use client";

import dynamic from "next/dynamic";
import { ChatIcon, EyeIcon } from "@wanin/ui";
import type { Feed } from "@wanin/types";
import { Avatar } from "@/components/client";
import { SerializedResult, useDeserialized } from "@/utils/hydration.util";
import { type FC } from "react";

const FeedWithHTML = dynamic(() => import("../../server/FeedWithHTML"));
const Youtube = dynamic(() => import("../../server/Youtube"));
const TwitchClip = dynamic(() => import("../../server/TwitchClip"));
const PlayList = dynamic(() => import("../../server/PlayList"));

interface Props {
  data: SerializedResult<Feed>;
}

const FeedDetail: FC<Props> = (props) => {
  const { data } = props;
  const _data = useDeserialized(data);

  return (
    <>
      <h2 className="mb-7">{_data.f_desc}</h2>
      <div className="mb-5 flex items-center">
        <Avatar
          username={_data.f_author_name}
          ratio={50}
          url={`https://img.league-funny.com/user_cover/${_data.fid}.jpg`}
        />
        <p className="ml-3 text-base">{_data.f_author_name}</p>
      </div>
      <div className="w-full flex gap-3 mb-7">
        <div className="flex gap-1 items-center">
          <EyeIcon size="base" className="text-gray-500" />
          <p className="text-base">{_data.f_views}</p>
        </div>
        <div className="flex gap-1 items-center">
          <ChatIcon size="base" className="text-gray-500" />
          <p className="text-base">{_data.f_commentcount}</p>
        </div>
      </div>
      <hr className="dark:border-gray-700 mb-7" />
      <div className="">
        {_data.f_type === "html" && (
          <FeedWithHTML htmlSource={_data.f_attachment} />
        )}
        {_data.f_type === "youtube" && (
          <>
            {JSON.parse(_data.f_attachment).map((item: any) => (
              <Youtube
                key={item.object_id}
                objectID={item.object_id}
                ytTitle={_data.f_desc}
              />
            ))}
          </>
        )}
        {_data.f_type === "twitch_clip" && (
          <>
            {JSON.parse(_data.f_attachment).map((item: any) => (
              <TwitchClip key={item.video_url} objectId={item.object_id} />
            ))}
          </>
        )}
        {_data.f_type === "playlist" && (
          <PlayList attachment={_data.f_attachment} />
        )}
        {_data.f_type === "article" && <>{_data.f_attachment}</>}
      </div>
    </>
  );
};

export default FeedDetail;
