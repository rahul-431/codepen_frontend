import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Log {
  method: "log" | "error";
  args: string[];
}
export interface CodeState {
  html: string;
  css: string;
  js: string;
  openResult: boolean;
  logs: Log[];
}

const initialState: CodeState = {
  html: "<h1>HelloWorld!</h1>",
  css: "h1{color:red}",
  js: "",
  logs: [],
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
    setLog(state, action: PayloadAction<Log>) {
      state.logs.push(action.payload); // Add the new log to the logs array
    },
    clearLogs(state) {
      state.logs = []; // Clear all logs
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCss, addHtml, addJs, setOpenResult, setLog, clearLogs } =
  codeSlice.actions;

export default codeSlice.reducer;
