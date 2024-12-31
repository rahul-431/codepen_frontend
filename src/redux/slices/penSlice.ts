import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  pens: PenResponse[];
} = {
  pens: [],
};
export const penSlice = createSlice({
  name: "pens",
  initialState,
  reducers: {
    addPens: (state, action: PayloadAction<PenResponse[]>) => {
      state.pens = action.payload;
    },
  },
});
export const { addPens } = penSlice.actions;
export default penSlice.reducer;
