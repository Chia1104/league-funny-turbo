import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/helpers/api/routes/auth";

interface State {
  status: Status;
  raw?: string | null;
}

enum Status {
  IDLE = "idle",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

enum ActionType {
  SET_TOKEN,
}

interface Action {
  type: ActionType;
  payload: {
    status: Status;
    raw: string | null;
  };
}

const initialState: State = {
  status: Status.IDLE,
  raw: null,
};

const TokenContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TOKEN:
      return {
        status: action.payload.status,
        raw: action.payload.raw,
      };
    default:
      return state;
  }
};

const TokenCtx = () => {
  const { dispatch } = useContext(TokenContext);

  useQuery(["x_token"], () => getToken(), {
    onSuccess: (data) => {
      dispatch({
        type: ActionType.SET_TOKEN,
        payload: {
          status:
            data.statusCode === 200
              ? Status.AUTHENTICATED
              : Status.UNAUTHENTICATED,
          raw: data?.data?.raw ?? null,
        },
      });
    },
    onError: () => {
      dispatch({
        type: ActionType.SET_TOKEN,
        payload: {
          status: Status.UNAUTHENTICATED,
          raw: null,
        },
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return null;
};

const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TokenContext.Provider value={{ state, dispatch }}>
      <TokenCtx />
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext, type State as TokenState };
