import type { IFeedModalState } from "./feed-modal.state";

const feedModalReducer = {
  handleModal: (state: IFeedModalState) => {
    state.isOpen = !state.isOpen;
  },
  openModal: (state: IFeedModalState) => {
    state.isOpen = true;
  },
  closeModal: (state: IFeedModalState) => {
    state.isOpen = false;
  },
};

export default feedModalReducer;
