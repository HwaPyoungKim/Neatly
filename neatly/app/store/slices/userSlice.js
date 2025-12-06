import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      profilePicture: "",
    },
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.value.profilePicture = action.payload;
    },
  },
});
export const { setProfilePicture } = userSlice.actions;

export default userSlice.reducer;
