interface IRootStateState {
  app: {
    isMounted: boolean;
  };
}

const initialState = {
  app: {
    isMounted: false,
  },
} satisfies IRootStateState;

export type { IRootStateState };
export default initialState;
