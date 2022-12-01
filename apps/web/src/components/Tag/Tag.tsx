import {
  type FC,
  useReducer,
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  Fragment,
} from "react";
import TagItem from "./TagItem";
import SearchTag from "./SearchTag";
import type { TagDTO, Tag as TagType } from "@wanin/shared/types";
import { Tooltip } from "@geist-ui/core";

interface State {
  tags: TagDTO[];
}

enum ActionType {
  SET_TAGS = "setTags",
  DELETE_TAG = "deleteTag",
}

interface Action {
  type: ActionType;
  payload?: TagType;
}

const initialState: State = {
  tags: [],
};

const TagContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TAGS:
      const {
        id: pid,
        name: p_name,
        slug: p_fbname,
      } = action.payload as TagType;
      const tagDTO = {
        pid: pid ? pid.toString() : null,
        p_name,
        p_fbname,
      } satisfies TagDTO;
      console.log(tagDTO);
      if (state.tags.some((tag) => tag.p_fbname === tagDTO.p_fbname)) {
        return state;
      }
      return {
        ...state,
        tags: state.tags.concat(tagDTO) satisfies TagDTO[],
      };
    case ActionType.DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(
          (tag) => tag.p_fbname !== action.payload?.slug
        ) satisfies TagDTO[],
      };
    default:
      return state;
  }
};

const TagProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TagContext.Provider value={{ state, dispatch }}>
      {children}
    </TagContext.Provider>
  );
};

const TagList = () => {
  const { state, dispatch } = useContext(TagContext);
  return (
    <>
      {state.tags.map((tag) => {
        if (tag.p_name.length < 7)
          return (
            <TagItem
              key={tag.pid}
              label={tag.p_name}
              onDeleted={() =>
                dispatch({
                  type: ActionType.DELETE_TAG,
                  payload: {
                    name: tag.p_name,
                    slug: tag.p_fbname,
                  },
                })
              }
            />
          );
        return (
          <Fragment key={tag.pid}>
            <Tooltip text={tag.p_name} enterDelay={0} leaveDelay={0}>
              <TagItem
                label={tag.p_name}
                onDeleted={() =>
                  dispatch({
                    type: ActionType.DELETE_TAG,
                    payload: {
                      name: tag.p_name,
                      slug: tag.p_fbname,
                    },
                  })
                }
              />
            </Tooltip>
          </Fragment>
        );
      })}
    </>
  );
};

const Search = () => {
  const { state } = useContext(TagContext);
  return state.tags.length < 10 ? <SearchTag /> : null;
};

const Tag: FC = () => {
  return (
    <TagProvider>
      <div className="w-full w-bg-secondary flex flex-wrap items-center p-2 rounded-lg border my-5 gap-3 w-border-primary">
        <TagList />
        <Search />
      </div>
    </TagProvider>
  );
};

export { TagContext, ActionType };
export default Tag;
