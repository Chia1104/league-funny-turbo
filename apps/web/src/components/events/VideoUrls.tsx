import {
  useState,
  useReducer,
  useContext,
  type Dispatch,
  createContext,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { VideoUrlsDTO } from "@wanin/shared/types";
import VideoUrlItem from "./VideoUrlItem";
import { useToasts } from "@geist-ui/core";

interface State {
  videoUrls: VideoUrlsDTO[];
}

export enum ACTIONS {
  ADD_VIDEO = "ADD_VIDEO",
  DELETE_VIDEO = "DELETE_VIDEO",
  EDIT_VIDEO_URL = "EDIT_VIDEO_URL",
  EDIT_COMMENT = "EDIT_COMMENT",
}

export interface Action {
  type: ACTIONS;
  payload?: VideoUrlsDTO;
}

const initialState: State = {
  videoUrls: [{ id: 0, video_url: "", comment: "" }],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.ADD_VIDEO:
      const {
        id: id,
        video_url: video_url,
        comment: comment,
      } = action.payload as VideoUrlsDTO;
      const videoDTO = {
        id: id ? id : 0,
        video_url,
        comment,
      } satisfies VideoUrlsDTO;
      return {
        ...state,
        videoUrls: state.videoUrls.concat(videoDTO) satisfies VideoUrlsDTO[],
      };

    case ACTIONS.DELETE_VIDEO:
      return {
        ...state,
        videoUrls: state.videoUrls.filter(
          (item) => item.id !== action.payload?.id
        ) satisfies VideoUrlsDTO[],
      };

    case ACTIONS.EDIT_VIDEO_URL:
      return {
        ...state,
        videoUrls: state.videoUrls.map((item) => {
          if (item.id === action.payload?.id) {
            return {
              ...item,
              video_url: action.payload?.video_url,
            };
          }
          return item;
        }),
      };
    case ACTIONS.EDIT_COMMENT:
      return {
        ...state,
        videoUrls: state.videoUrls.map((item) => {
          if (item.id === action.payload?.id) {
            return {
              ...item,
              comment: action.payload?.comment,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

interface VideoUrlsRef {
  getVideoUrls: () => VideoUrlsDTO[];
}

const VideoUrlsCtx = forwardRef<VideoUrlsRef>((_, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState(1);
  const { setToast } = useToasts();

  useImperativeHandle(ref, () => ({
    getVideoUrls: () => state.videoUrls,
  }));

  const addItem = () => {
    if (state.videoUrls.length < 30) {
      dispatch({
        type: ACTIONS.ADD_VIDEO,
        payload: { id: count, video_url: "", comment: "" },
      });
      setCount((prev) => prev + 1);
    } else {
      setToast({
        text: "影片最多30則",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <div className="my-3 p-4 flex flex-col bg-gray-400 rounded-lg shadow-lg dark:bg-dark">
        {state.videoUrls.map((videoUrls, index) => {
          return (
            <div
              className="flex items-center justify-between mb-3 w-full"
              key={videoUrls.id}>
              <div className="mr-3 text-lg text-white">{index + 1}.</div>
              <VideoUrlItem videoUrls={videoUrls} dispatch={dispatch} />
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
    </>
  );
});

VideoUrlsCtx.displayName = "VideoUrlsCtx";

export type { VideoUrlsRef };
export default VideoUrlsCtx;
