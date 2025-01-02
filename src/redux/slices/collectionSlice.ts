import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  collections: Collection[];
  deletedCollections: Collection[];
} = {
  collections: [],
  deletedCollections: [],
};
export const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.collections.push(action.payload);
    },
    addDeletedCollections: (state, action: PayloadAction<Collection[]>) => {
      state.deletedCollections = action.payload;
    },
    addDeletedCollection: (state, action: PayloadAction<Collection>) => {
      state.deletedCollections.push(action.payload);
    },
    changeStateCollectionType: (
      state,
      action: PayloadAction<ChangeTypeRequest>
    ) => {
      const collection = state.collections.find(
        (col) => col._id === action.payload.id
      );
      if (collection) {
        collection.type = action.payload.value;
      }
    },
    updateCollection: (state, action: PayloadAction<CollectionRequest>) => {
      const collection = state.collections.find(
        (col) => col._id === action.payload.id
      );
      if (collection) {
        collection.title = action.payload.title;
        collection.description = action.payload.description;
      }
    },
    deleteStateCollection: (state, action: PayloadAction<Collection>) => {
      state.collections = state.collections.filter(
        (col) => col._id !== action.payload._id
      );
      state.deletedCollections.push(action.payload);
    },
    deleteStateCollectionPer: (
      state,
      action: PayloadAction<StateDeleteType>
    ) => {
      state.deletedCollections = state.deletedCollections.filter(
        (col) => col._id !== action.payload.id
      );
    },
    restoreCollection: (state, action: PayloadAction<Collection>) => {
      state.deletedCollections = state.deletedCollections.filter(
        (col) => col._id !== action.payload._id
      );
      state.collections.push(action.payload);
    },
  },
});
export const {
  addCollections,
  changeStateCollectionType,
  deleteStateCollection,
  addDeletedCollections,
  deleteStateCollectionPer,
  addCollection,
  updateCollection,
  restoreCollection,
} = collectionSlice.actions;
export default collectionSlice.reducer;
