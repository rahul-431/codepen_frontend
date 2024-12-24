import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/CodeSlice";

export const store = configureStore({
  reducer: codeReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
