import { combineReducers } from "@reduxjs/toolkit";
import feedModalReducer from "./feed-modal";
import rootStateReducer from "./root-state";

const rootReducer = combineReducers({
  feedModal: feedModalReducer,
  rootState: rootStateReducer,
});

export default rootReducer;
