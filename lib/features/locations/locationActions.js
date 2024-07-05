import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

const fetchAllLocations = createAsyncThunk(
  "locations/fetchAllLocations",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        "https://yardmanager-be.vercel.app/api/locations/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addLocation = createAsyncThunk(
  "locations/addLocation",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/locations/new",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export { fetchAllLocations, addLocation };
