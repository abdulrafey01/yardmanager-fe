import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";
import {
  getCookie,
  removeCookie,
  removeLocalStorage,
  setCookie,
  setLocalStorage,
} from "../../../app/helpers/storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getCookie("token") ? getCookie("token") : null,
    toastMsg: null,
    error: null,
    // user: getLocalStorage("user") ? JSON.parse(getLocalStorage("user")) : null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      // state.user = null;
      state.toastMsg = null;
      state.error = null;
      // removeLocalStorage("user");
    },
  },
  extraReducers: (builder) => {
    // log In
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
        // set cookie
        setCookie("token", action.payload.data.token);
        state.token = action.payload.data.token;

        // set localStorage
        // setLocalStorage("user", {
        //   type: action.payload.userType,
        //   data: action.payload.data.user,
        // });
        state.toastMsg = null;
      } else {
        state.toastMsg = action.payload.message;
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
