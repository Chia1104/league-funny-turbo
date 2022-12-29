import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { IS_PRODUCTION } from "@/shared/constants";

const store = configureStore({
  reducer: rootReducer,
  devTools: !IS_PRODUCTION,
});

export default store;
