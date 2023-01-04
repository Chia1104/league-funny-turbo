import { Tag, type TagRef } from "@/components";
import {
  type ChangeEvent,
  useRef,
  useReducer,
  createContext,
  type Dispatch,
  useCallback,
  useMemo,
  useContext,
} from "react";
import SelectBord from "./SelectBord";
import { Button, Input } from "@wanin/ui";
import { titleSchema, newVideoSchema } from "@wanin/shared/utils/zod-schema";
import { useToasts } from "@geist-ui/core";
import { useRouter } from "next/router";
import { addPlaylist } from "@/helpers/api/routes/playlist";
import { NewVideoDTO } from "@wanin/shared/types";
import VideoUrls, { VideoUrlsRef } from "./VideoUrls/VideoUrls";

enum ActionType {
  SET_TITLE = "SET_TITLE",
  SET_VIDEOURLS = "SET_VIDEOURL",
  SET_GAME_TYPE = "SET_GAME_TYPE",
  SET_CATEGORY = "SET_CATEGORY",
  SET_TAGS = "SET_TAGS",
}

interface Action {
  type: ActionType;
  payload: Partial<NewVideoDTO>;
}

const initialState: Partial<NewVideoDTO> = {
  title: "",
  videoUrls: [],
  tags: [],
  gameType: "",
  catalogue: 0,
};

const NewVideoContext = createContext<{
  state: Partial<NewVideoDTO>;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: Partial<NewVideoDTO>, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TITLE:
      return { ...state, title: action.payload.title };
    case ActionType.SET_VIDEOURLS:
      return { ...state, video_url: action.payload.videoUrls };
    case ActionType.SET_TAGS:
      return { ...state, tags: action.payload.tags };
    case ActionType.SET_GAME_TYPE:
      return { ...state, gameType: action.payload.gameType };
    case ActionType.SET_CATEGORY:
      return { ...state, catalogue: action.payload.catalogue };
    default:
      return state;
  }
};

const NewVideo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NewVideoContext.Provider value={{ state, dispatch }}>
      <WrappedNewVideo />
    </NewVideoContext.Provider>
  );
};

const WrappedNewVideo = () => {
  const { state, dispatch } = useContext(NewVideoContext);
  const tagRef = useRef<TagRef>(null);
  const videoUrlsRef = useRef<VideoUrlsRef>(null);
  const { setToast } = useToasts();
  const router = useRouter();

  const validation = useCallback(() => {
    const newVideo = {
      title: state.title,
      videoUrls: videoUrlsRef.current?.getVideoUrls(),
      tags: tagRef.current?.getTags(),
      gameType: state.gameType,
      catalogue: state.catalogue,
    };
    try {
      newVideoSchema
        .pick({
          title: true,
          videoUrls: true,
          gameType: true,
          catalogue: true,
        })
        .parse(newVideo);
      return true;
    } catch (e) {
      return false;
    }
  }, [state]);
  const isValidate = useMemo(() => validation(), [validation]);

  const addVideo = async () => {
    const newList = videoUrlsRef.current
      ?.getVideoUrls()
      .filter((item) => item.video_url !== "")
      .map((item) => {
        delete item.id;
        return item;
      });
    if (!newList?.length) {
      setToast({
        text: "至少要有一支影片",
        type: "warning",
      });
    } else {
      const newVideo = {
        title: state.title,
        videoUrls: newList,
        gameType: state.gameType,
        catalogue: state.catalogue,
        tags: tagRef.current?.getTags(),
      };
      if (!newVideoSchema.safeParse(newVideo).success) {
        setToast({
          text: "請確認資料是否正確",
          type: "warning",
        });
        return;
      }

      const res = await addPlaylist({ newVideo });
      if (!res.data || res.statusCode !== 200) {
        setToast({
          text: res.message || "新增影片失敗",
          type: "warning",
        });
        return;
      }
      setToast({
        text: "新增影片成功",
        type: "success",
      });
      await router.push(`/b/${res?.data?.gameType}/f/${res?.data?.fid}`);
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addVideo();
  };

  return (
    <>
      <form className="w-full max-w-[640px] p-5" onSubmit={handleSubmit}>
        <p className="text-3xl text-center mb-4">張貼影片</p>
        <Input
          className="px-2 py-1 text-lg"
          placeholder="影片標題"
          schema={titleSchema}
          errorClassName="my-1"
          error="標題太長或太短了"
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_TITLE,
              payload: { title: e.target.value },
            });
          }}
        />
        <VideoUrls ref={videoUrlsRef} />
        <SelectBord
          onBordChange={(value) => {
            dispatch({
              type: ActionType.SET_CATEGORY,
              payload: { catalogue: 0 },
            });
            dispatch({
              type: ActionType.SET_GAME_TYPE,
              payload: { gameType: value },
            });
          }}
          onCategoryChange={(value) =>
            dispatch({
              type: ActionType.SET_CATEGORY,
              payload: { catalogue: value },
            })
          }
        />
        <div className="relative z-20">
          <Tag ref={tagRef} />
        </div>
        <div className="z-10 relative w-full flex justify-center">
          <Button text="新增影片" type="submit" disabled={!isValidate} />
        </div>
      </form>
    </>
  );
};
export default NewVideo;
