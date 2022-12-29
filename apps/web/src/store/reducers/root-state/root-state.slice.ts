import { createSlice } from "@reduxjs/toolkit";
import rootStateState from "./root-state.state";
import rootStateReducer from "./root-state.reducer";
import { type AppState } from "../../type";

const rootStateSlice = createSlice({
  name: "rootState",
  initialState: rootStateState,
  reducers: rootStateReducer,
});

const { handleAppMounted } = rootStateSlice.actions;

const rootStateSelector = (state: AppState) => state.rootState;

export { rootStateSelector, handleAppMounted };
export default rootStateSlice.reducer;
