import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};
type TAuthState = {
  user: null | TUser;
  token: null | string;
  userId: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, userId } = action.payload;
      state.user = user;
      state.token = token;
      state.userId = userId;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserId = (state: RootState) => state.auth.userId;
