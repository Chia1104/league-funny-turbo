import { commentSchema, video_urlSchema } from "@wanin/shared/utils/zod-schema";
import { Input } from "@wanin/ui";
import { ACTIONS } from "./NewVideo";

const PlayListItem = ({ videoUrls, dispatch }) => {
  return (
    <div className="flex items-center">
      <div className="w-[490px]">
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
              payload: { id: videoUrls.id, video_url: e.target.value },
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
              payload: { id: videoUrls.id, comment: e.target.value },
            });
          }}
        />
      </div>
      {videoUrls.id > 1 ? (
        <div
          className="flex justify-center border-0 rounded-lg bg-danger hover:bg-[#fa6055] cursor-pointer w-[50px] mx-2 py-1 text-white dark:border dark:bg-dark dark:hover:bg-black w-border-primary"
          onClick={() =>
            dispatch({
              type: ACTIONS.DELETE_VIDEO,
              payload: { id: videoUrls.id },
            })
          }>
          刪除
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlayListItem;
