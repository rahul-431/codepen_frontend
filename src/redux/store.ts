import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/CodeSlice";
import { penApiSlice } from "./slices/penApiSlice";

export const store = configureStore({
  reducer: {
    code: codeReducer,
    [penApiSlice.reducerPath]: penApiSlice.reducer,
  },

  //caching and other benefits from rtk query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(penApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
