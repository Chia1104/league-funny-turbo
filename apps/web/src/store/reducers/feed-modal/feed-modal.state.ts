interface IFeedModalState {
  isOpen: boolean;
}

const initialState = {
  isOpen: false,
} satisfies IFeedModalState;

export type { IFeedModalState };
export default initialState;
