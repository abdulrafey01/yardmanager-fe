import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
const fetchCounts = createAsyncThunk(
  "dashboard/fetchCounts",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token");

    try {
      const { data } = await axios.get(
        "https://yardmanager-be.vercel.app/api/analytics/count",
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

const fetchInventoryCounts = createAsyncThunk(
  "dashboard/fetchInventoryCounts",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/analytics/inventory?division=month`,
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

const fetchPartCounts = createAsyncThunk(
  "dashboard/fetchPartCounts",
  async (division, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/analytics/part?division=month`,
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

export { fetchCounts, fetchInventoryCounts, fetchPartCounts };
