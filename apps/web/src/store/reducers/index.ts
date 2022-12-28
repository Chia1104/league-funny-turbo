import { combineReducers } from "@reduxjs/toolkit";
import feedModalReducer from "./feed-modal";

const rootReducer = combineReducers({
  feedModal: feedModalReducer,
});

export default rootReducer;
