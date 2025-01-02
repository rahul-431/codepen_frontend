import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  pens: PenResponse[];
  deletedPens: PenResponse[];
} = {
  pens: [],
  deletedPens: [],
};
export const penSlice = createSlice({
  name: "pens",
  initialState,
  reducers: {
    addPens: (state, action: PayloadAction<PenResponse[]>) => {
      state.pens = action.payload;
    },
    addPen: (state, action: PayloadAction<PenResponse>) => {
      state.pens.push(action.payload);
    },
    addDeletedPens: (state, action: PayloadAction<PenResponse[]>) => {
      state.deletedPens = action.payload;
    },
    addDeletedPen: (state, action: PayloadAction<PenResponse>) => {
      state.deletedPens.push(action.payload);
    },
    changeStatePenType: (state, action: PayloadAction<ChangeTypeRequest>) => {
      const pen = state.pens.find((pen) => pen._id === action.payload.id);
      if (pen) {
        pen.type = action.payload.value;
      }
    },
    deleteStatePen: (state, action: PayloadAction<PenResponse>) => {
      state.pens = state.pens.filter((pen) => pen._id !== action.payload._id);
      state.deletedPens.push(action.payload);
    },
    deleteStatePenPer: (state, action: PayloadAction<StateDeleteType>) => {
      state.deletedPens = state.pens.filter(
        (pen) => pen._id !== action.payload.id
      );
    },
    restorePen: (state, action: PayloadAction<PenResponse>) => {
      state.deletedPens = state.pens.filter(
        (pen) => pen._id !== action.payload._id
      );
      state.pens.push(action.payload);
    },
  },
});
export const {
  addPens,
  addPen,
  changeStatePenType,
  deleteStatePen,
  addDeletedPen,
  addDeletedPens,
  deleteStatePenPer,
  restorePen,
} = penSlice.actions;
export default penSlice.reducer;
