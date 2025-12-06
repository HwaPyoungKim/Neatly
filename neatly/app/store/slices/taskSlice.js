import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    addTaskLocal: (state, action) => {
      state.list.push(action.payload);
    },
    updateTaskLocal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.list.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
      }
    },
    deleteTaskLocal: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTaskLocal, updateTaskLocal, deleteTaskLocal } =
  taskSlice.actions;

export default taskSlice.reducer;
