import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.list = action.payload;
    },
    addHabitLocal: (state, action) => {
      state.list.push(action.payload);
    },
    updateHabitLocal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.list.findIndex((h) => h.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
      }
    },
    deleteHabitLocal: (state, action) => {
      state.list = state.list.filter((h) => h.id !== action.payload);
    },
  },
});

export const { setHabits, addHabitLocal, updateHabitLocal, deleteHabitLocal } =
  habitSlice.actions;

export default habitSlice.reducer;
