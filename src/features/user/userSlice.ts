// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

interface UserState {
  isAuthorized: boolean;
}

const initialState: UserState = {
  isAuthorized: !!Cookie.get("token"),
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthorized = true;
    },
    signOut: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
