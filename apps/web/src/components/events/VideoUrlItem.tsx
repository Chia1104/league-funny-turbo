import { commentSchema, video_urlSchema } from "@wanin/shared/utils/zod-schema";
import { Input } from "@wanin/ui";
import { ACTIONS, Action } from "./VideoUrls";
import { VideoUrlsDTO } from "@wanin/shared/types";
import { Dispatch } from "react";

const VideoUrlItem = ({
  videoUrls,
  dispatch,
}: {
  videoUrls: VideoUrlsDTO;
  dispatch: Dispatch<Action>;
}) => {
  return (
    <div className="flex items-center flex-1">
      <div className="w-full">
        <Input
          className="px-2 py-1 text-base"
          placeholder="網址 (輸入youtube、facebook、twitch clip)"
          schema={video_urlSchema}
          errorClassName="my-1"
          error="請輸入正確的網址"
          defaultValue={videoUrls.video_url}
          onChange={(e) => {
            dispatch({
              type: ACTIONS.EDIT_VIDEO_URL,
              payload: {
                id: videoUrls.id,
                video_url: e.target.value,
                comment: videoUrls.comment,
              },
            });
          }}
        />
        <Input
          className="px-2 py-1 text-base"
          placeholder="個人短評 (輸入你對影片的簡短感想)"
          schema={commentSchema}
          errorClassName="my-1"
          error="評論太長或太短了"
          defaultValue={videoUrls.comment}
          onChange={(e) => {
            dispatch({
              type: ACTIONS.EDIT_COMMENT,
              payload: {
                id: videoUrls.id,
                video_url: videoUrls.video_url,
                comment: e.target.value,
              },
            });
          }}
        />
      </div>
      <div
        className="flex justify-center items-center font-bold border-2 rounded-full bg-secondary hover:bg-primary cursor-pointer mx-2 text-white dark:border dark:bg-dark dark:hover:bg-black w-border-primary"
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_VIDEO,
            payload: {
              id: videoUrls.id,
              video_url: videoUrls.video_url,
              comment: videoUrls.comment,
            },
          })
        }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
      </div>
    </div>
  );
};

export default VideoUrlItem;
