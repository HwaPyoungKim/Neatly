// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload;
    },
    addCategory: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
