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
    changeStatePenType: (state, action: PayloadAction<ChangeTypeRequest>) => {
      const pen = state.pens.find((pen) => pen._id === action.payload.id);
      if (pen) {
        pen.type = action.payload.value;
      }
    },
    deleteStatePen: (state, action: PayloadAction<StateDeleteType>) => {
      state.pens = state.pens.filter((pen) => pen._id !== action.payload.id);
    },
  },
});
export const { addPens, changeStatePenType, deleteStatePen } = penSlice.actions;
export default penSlice.reducer;
