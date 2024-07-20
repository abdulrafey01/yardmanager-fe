import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";
import {
  getCookie,
  getLocalStorage,
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
    btnLoader: false,
    user: null, // can't directly set from localstorage here because it gives error bcz next is bt default uses ssr
  },
  reducers: {
    logout: (state) => {
      removeCookie("token");
      removeLocalStorage("user");
      state.token = null;
      state.user = null;
      state.company = null;
      state.toastMsg = null;
      state.error = null;
      state.btnLoader = false;
    },

    resetToast: (state) => {
      state.toastMsg = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // log In
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload?.response?.data?.message,
          red: true,
        };
        state.btnLoader = false;
      } else {
        state.toastMsg = {
          msg: "Network Problem",
          red: true,
        };
      }
    });

    builder.addCase(login.pending, (state) => {
      state.btnLoader = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.token = action.payload.data.token;
        state.toastMsg = null;
        state.error = null;
        state.btnLoader = true;
      } else {
        state.toastMsg = {
          msg: action.payload.message,
          red: true,
        };
      }
    });
  },
});

export const { logout, setUser, resetToast } = authSlice.actions;
export default authSlice.reducer;
