import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, setLocalStorage } from "../../../app/helpers/storage";

const login = createAsyncThunk(
  "/users/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/login",
        body
      );

      setLocalStorage("user", {
        userType: data.userType,
        data: data.data.user,
        company: data.data.company,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { login };
