import { Tag, type TagRef } from "@/components";
import {
  type ChangeEvent,
  useRef,
  useState,
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
import { VideoUrlsDTO, NewVideoDTO } from "@wanin/shared/types";
import PlayListItem from "./PlayListItem";

export enum ACTIONS {
  ADD_VIDEO = "ADD_VIDEO",
  DELETE_VIDEO = "DELETE_VIDEO",
  EDIT_VIDEO_URL = "EDIT_VIDEO_URL",
  EDIT_COMMENT = "EDIT_COMMENT",
}

const playlistInitialState = [{ id: 1, video_url: "", comment: "" }];

const playListReducer = (state: VideoUrlsDTO[], action) => {
  switch (action.type) {
    case ACTIONS.ADD_VIDEO:
      return [
        ...state,
        {
          id: action.payload.id + 1,
          video_url: action.payload.video_url,
          comment: action.payload.comment,
        },
      ];
    case ACTIONS.DELETE_VIDEO:
      return state.filter((item) => item.id !== action.payload.id);
    case ACTIONS.EDIT_VIDEO_URL:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            video_url: action.payload.video_url,
          };
        }
        return item;
      });
    case ACTIONS.EDIT_COMMENT:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            comment: action.payload.comment,
          };
        }
        return item;
      });
    default:
      return state;
  }
};

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
  const [playListState, playListDispatch] = useReducer(
    playListReducer,
    playlistInitialState
  );
  const [count, setCount] = useState(1);
  const tagRef = useRef<TagRef>(null);
  const { setToast } = useToasts();
  const router = useRouter();

  const validation = useCallback(() => {
    const newVideo = {
      title: state.title,
      videoUrls: playListState,
      tags: tagRef.current?.getTags(),
      gameType: state.gameType,
      catalogue: state.catalogue,
    };
    try {
      newVideoSchema
        .pick({
          title: true,
          gameType: true,
          catalogue: true,
        })
        .parse(newVideo);
      return true;
    } catch (e) {
      return false;
    }
  }, [playListState, state]);
  const isValidate = useMemo(() => validation(), [validation]);

  const addVideo = async () => {
    const newList = playListState.map((item) => {
      delete item.id;
      return item;
    });
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
    if (res.statusCode !== 200) {
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
    if (res.data)
      await router.push(`/b/${res?.data?.gameType}/f/${res?.data?.fid}`);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addVideo();
  };

  const addItem = () => {
    playListDispatch({
      type: ACTIONS.ADD_VIDEO,
      payload: { id: count, video_url: "", comment: "" },
    });
    setCount((prev) => prev + 1);
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
        <div className="my-3 p-4 flex flex-col bg-gray-400 rounded-lg shadow-lg dark:bg-dark">
          {playListState.map((videoUrls: any, index: number) => {
            return (
              <div className="flex items-center mb-3" key={videoUrls.id}>
                <div className="mr-3 text-base text-white">{index + 1}.</div>
                <PlayListItem
                  videoUrls={videoUrls}
                  dispatch={playListDispatch}
                />
              </div>
            );
          })}
          <div
            className="flex justify-center mt-4 rounded-lg bg-white hover:bg-gray-100 cursor-pointer py-1 w-full dark:bg-dark dark:hover:bg-black w-border-primary"
            onClick={addItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            <span>增加選項</span>
          </div>
        </div>
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
