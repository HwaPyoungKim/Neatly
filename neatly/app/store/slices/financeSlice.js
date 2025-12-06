import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setFinance: (state, action) => {
      state.list = action.payload;
    },
    addFinanceLocal: (state, action) => {
      state.list.push(action.payload);
    },
    updateFinanceLocal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.list.findIndex((f) => f.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
      }
    },
    deleteFinanceLocal: (state, action) => {
      state.list = state.list.filter((f) => f.id !== action.payload);
    },
  },
});

export const {
  setFinance,
  addFinanceLocal,
  updateFinanceLocal,
  deleteFinanceLocal,
} = financeSlice.actions;

export default financeSlice.reducer;
