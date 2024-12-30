import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "./slices/CodeSlice";
import { penApiSlice } from "./slices/penApiSlice";
import { authApiSlice } from "./slices/authApiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    code: codeReducer,
    [penApiSlice.reducerPath]: penApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },

  //caching and other benefits from rtk query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(penApiSlice.middleware)
      .concat(authApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
