import type { IFeedModalState } from "./feed-modal.state";

const feedModalReducer = {
  handleModal: (state: IFeedModalState) => {
    state.isOpen = !state.isOpen;
  },
};

export default feedModalReducer;
