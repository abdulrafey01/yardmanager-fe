import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const login = createAsyncThunk(
  "/users/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/login",
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { login };
