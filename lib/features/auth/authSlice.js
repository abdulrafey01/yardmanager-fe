import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../../../app/helpers/storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getCookie("token") ? getCookie("token") : null,
    toastMsg: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      removeCookie("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Connection Problem";
      }
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.success) {
        setCookie("token", action.payload.token);
        state.token = action.payload.token;
        // state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
