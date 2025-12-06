import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      email: "",
      localId: "",
      refreshToken: "",
      idToken: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.email = action.payload.email;
      state.value.localId = action.payload.localId;
      state.value.refreshToken = action.payload.refreshToken;
      state.value.idToken = action.payload.idToken;
    },
    clearUser: (state) => {
      state.value.email = "";
      state.value.localId = "";
      state.value.refreshToken = "";
      state.value.idToken = "";
    },
  },
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
