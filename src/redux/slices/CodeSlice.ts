import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CodeState {
  html: string;
  css: string;
  js: string;
  openResult: boolean;
}

const initialState: CodeState = {
  html: "",
  css: "",
  js: "",
  openResult: true,
};

export const codeSlice = createSlice({
  name: "codes",
  initialState,
  reducers: {
    addHtml: (state, action: PayloadAction<string>) => {
      state.html = action.payload;
    },
    addCss: (state, action: PayloadAction<string>) => {
      state.css = action.payload;
    },
    addJs: (state, action: PayloadAction<string>) => {
      state.js = action.payload;
    },
    setOpenResult: (state, action: PayloadAction<boolean>) => {
      state.openResult = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCss, addHtml, addJs, setOpenResult } = codeSlice.actions;

export default codeSlice.reducer;
