import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  _id: string;
  email: string;
  isAuthenticated?: boolean;
}
const initialState: userState = {
  _id: "",
  email: "",
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",

  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<userState>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    resetUser: (state = initialState) => {
      return (state = initialState);
    },
  },
});

export const { addUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
