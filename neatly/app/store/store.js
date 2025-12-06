import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { authApi } from "../../services/authService";
import { userApi } from "../../services/userService";
import { userSlice } from "./slices/userSlice";
import { categoryApi } from "../../services/categoryService";
import { categorySlice } from "./slices/categorySlice";
import { habitSlice } from "./slices/habitSlice";
import { taskSlice } from "./slices/taskSlice";
import { financeSlice } from "./slices/financeSlice";
import { habitApi } from "../../services/habitService";
import { taskApi } from "../../services/taskService";
import { financeApi } from "../../services/financeService";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    user: userSlice.reducer,
    category: categorySlice.reducer,
    habit: habitSlice.reducer,
    task: taskSlice.reducer,
    finance: financeSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [habitApi.reducerPath]: habitApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(habitApi.middleware)
      .concat(taskApi.middleware)
      .concat(financeApi.middleware),
});
