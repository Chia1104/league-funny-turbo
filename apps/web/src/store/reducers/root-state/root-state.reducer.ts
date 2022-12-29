import type { IRootStateState } from "./root-state.state";

const rootStateReducer = {
  handleAppMounted: (state: IRootStateState) => {
    state.app.isMounted = !state.app.isMounted;
  },
};

export default rootStateReducer;
