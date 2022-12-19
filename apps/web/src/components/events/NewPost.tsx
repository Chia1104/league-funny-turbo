import { Tag, type TagRef } from "@/components";
import {
  type ChangeEvent,
  useRef,
  useReducer,
  createContext,
  type Dispatch,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { FroalaEditor } from "@/components";
import SelectBord from "./SelectBord";
import UploadCover, { type UploadCoverRef } from "./UploadCover";
import { Button, Input } from "@wanin/ui";
import { titleSchema, newPostSchema } from "@wanin/shared/utils/zod-schema";
import { useToasts } from "@geist-ui/core";
import { addNewFeed } from "@/helpers/api/routes/feed";
import { useRouter } from "next/router";
import { imgTagRegex, imgTagSrcRegex } from "./util";
import { NewPostDTO } from "@wanin/shared/types";

enum ActionType {
  SET_TITLE = "SET_TITLE",
  SET_CONTENT = "SET_CONTENT",
  SET_COVER = "SET_COVER",
  SET_GAME_TYPE = "SET_GAME_TYPE",
  SET_CATEGORY = "SET_CATEGORY",
  SET_TAGS = "SET_TAGS",
}

interface Action {
  type: ActionType;
  payload: Partial<NewPostDTO>;
}

const initialState: Partial<NewPostDTO> = {
  title: "",
  content: "",
  cover: "",
  gameType: "",
  catalogue: 0,
  tags: [],
};

const NewPostContext = createContext<{
  state: Partial<NewPostDTO>;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: Partial<NewPostDTO>, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TITLE:
      return { ...state, title: action.payload.title };
    case ActionType.SET_CONTENT:
      return { ...state, content: action.payload.content };
    case ActionType.SET_COVER:
      return { ...state, cover: action.payload.cover };
    case ActionType.SET_GAME_TYPE:
      return { ...state, gameType: action.payload.gameType };
    case ActionType.SET_CATEGORY:
      return { ...state, catalogue: action.payload.catalogue };
    case ActionType.SET_TAGS:
      return { ...state, tags: action.payload.tags };
    default:
      return state;
  }
};

const NewPost = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NewPostContext.Provider value={{ state, dispatch }}>
      <WrappedNewPost />
    </NewPostContext.Provider>
  );
};

const WrappedNewPost = () => {
  const { state, dispatch } = useContext(NewPostContext);
  const tagRef = useRef<TagRef>(null);
  const uploadCoverRef = useRef<UploadCoverRef>(null);
  const { setToast } = useToasts();
  const router = useRouter();

  const validation = useCallback(() => {
    const newPost = {
      title: state.title,
      content: state.content,
      cover: uploadCoverRef.current?.fileUrl,
      gameType: state.gameType,
      catalogue: state.catalogue,
      tags: tagRef.current?.getTags(),
    };
    try {
      newPostSchema
        .pick({
          title: true,
          content: true,
          gameType: true,
          catalogue: true,
        })
        .parse(newPost);
      return true;
    } catch (e) {
      return false;
    }
  }, [state]);
  const isValidate = useMemo(() => validation(), [validation]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addPost();
  };

  const addPost = async () => {
    const newPost = {
      title: state.title,
      content: state.content,
      cover:
        uploadCoverRef.current?.fileUrl ||
        state.content?.match(imgTagRegex)?.[0]?.match(imgTagSrcRegex)?.[1] ||
        "",
      gameType: state.gameType,
      catalogue: state.catalogue,
      tags: tagRef.current?.getTags(),
    };
    if (!newPostSchema.safeParse(newPost).success) {
      setToast({
        text: "請確認資料是否正確",
        type: "warning",
      });
      return;
    }
    const res = await addNewFeed({ newPost });
    if (res.statusCode !== 200) {
      setToast({
        text: res?.message || "新增文章失敗",
        type: "warning",
      });
      return;
    }
    setToast({
      text: "新增文章成功",
      type: "success",
    });
    await router.push(`/b/${res?.data?.gameType}/f/${res?.data?.fid}`);
  };

  return (
    <form className="w-full max-w-[640px]" onSubmit={handleSubmit}>
      <Input
        onChange={(e) => {
          dispatch({
            type: ActionType.SET_TITLE,
            payload: { title: e.target.value },
          });
        }}
        className="p-2 text-2xl"
        placeholder="文章標題"
        schema={titleSchema}
        errorClassName="my-1"
        error="標題太長或太短了"
      />
      <div className="w-full flex justify-center my-6">
        <UploadCover ref={uploadCoverRef} />
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
      <FroalaEditor
        onContentChange={(value) => {
          dispatch({
            type: ActionType.SET_CONTENT,
            payload: { content: value },
          });
          console.log(
            value?.match(imgTagRegex)?.[0]?.match(imgTagSrcRegex)?.[1] ??
              "No image src match"
          );
        }}
      />
      <div className="relative z-20">
        <Tag ref={tagRef} />
      </div>
      <div className="z-10 relative w-full flex justify-center">
        <Button text="新增文章" type="submit" disabled={!isValidate} />
      </div>
    </form>
  );
};
export default NewPost;
