import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      email: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.email = action.payload.email;
    },
  },
});

export const { setUser } = AuthSlice.actions; // Exportar las acciones
export default AuthSlice.reducer;
