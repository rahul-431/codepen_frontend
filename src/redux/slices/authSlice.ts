import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthSlice = {
  user: {
    _id: "",
    name: "",
    email: "",
    pens: [],
    collections: [],
    followers: [],
    following: [],
  },
  token: {
    accessToken: "",
    refreshToken: "",
  },
};
export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addToken: (state, action: PayloadAction<Token>) => {
      state.token = action.payload;
    },
    removeUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
export const { addUser, addToken, removeUser } = authSlice.actions;
export default authSlice.reducer;
