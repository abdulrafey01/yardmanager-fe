import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, setLocalStorage } from "../../../app/helpers/storage";
import cookie from "js-cookie";

const login = createAsyncThunk(
  "/users/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/login",
        body.data
      );
      // setLocalStorage("user", {
      //   userType: data.userType,
      // });

      // set cookie
      if (body.rememberme) {
        cookie.set("token", data.data.token);
      } else {
        window?.sessionStorage.setItem("token", data.data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { login };
