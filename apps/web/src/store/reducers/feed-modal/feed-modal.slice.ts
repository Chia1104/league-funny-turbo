import { createSlice } from "@reduxjs/toolkit";
import feedModalState from "./feed-modal.state";
import feedModalReducer from "./feed-modal.reducer";
import { type AppState } from "../../type";

const feedModalSlice = createSlice({
  name: "feedModal",
  initialState: feedModalState,
  reducers: feedModalReducer,
});

const { handleModal } = feedModalSlice.actions;

const feedModalSelector = (state: AppState) => state.feedModal;

export { feedModalSelector, handleModal };
export default feedModalSlice.reducer;
