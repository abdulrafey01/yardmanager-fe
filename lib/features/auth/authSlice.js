import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";
import { removeCookie, removeLocalStorage } from "../../../app/helpers/storage";

import cookie from "js-cookie";

// Helper function to check if running in browser
const isBrowser = typeof window !== "undefined";

// Get token from cookies or sessionStorage
const getToken = () => {
  if (isBrowser) {
    return cookie.get("token")
      ? cookie.get("token")
      : window.sessionStorage.getItem("token")
      ? window.sessionStorage.getItem("token")
      : null;
  }
  return null;
};

const getAdminToken = () => {
  if (isBrowser) {
    return cookie.get("adminToken")
      ? cookie.get("adminToken")
      : window.sessionStorage.getItem("adminToken")
      ? window.sessionStorage.getItem("adminToken")
      : null;
  }
  return null;
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getToken(),
    adminToken: getAdminToken(),
    toastMsg: null,
    error: null,
    btnLoader: false,
    user: null, // can 't directly set from localstorage here because it gives error bcz next is bt default uses ssr
  },
  reducers: {
    logout: (state) => {
      removeCookie("token");
      window?.sessionStorage.removeItem("token");
      removeLocalStorage("user");

      removeLocalStorage("priceToggle");
      removeLocalStorage("partImageToggle");
      removeLocalStorage("invoiceId");
      state.token = null;
      state.user = null;
      state.company = null;
      state.toastMsg = null;
      state.error = null;
      state.btnLoader = false;
      window.location.href = "/sign-in";
    },
    adminLogout: (state) => {
      removeCookie("adminToken");
      window?.sessionStorage.removeItem("adminToken");
      removeLocalStorage("companyId");
      state.adminToken = null;
      window.location.href = "/admin/sign-in";
    },

    resetToast: (state) => {
      state.toastMsg = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setPriceToggle: (state, action) => {
      state.user["company"]["price"] = action.payload;
    },
    setImageToggle: (state, action) => {
      state.user["company"]["image"] = action.payload;
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
        window.location.href = "/dashboard";
      } else {
        state.toastMsg = {
          msg: action.payload.message,
          red: true,
        };
      }
    });
  },
});

export const { logout, adminLogout, setUser, resetToast, setAdminToken, setPriceToggle, setImageToggle } =
  authSlice.actions;
export default authSlice.reducer;
