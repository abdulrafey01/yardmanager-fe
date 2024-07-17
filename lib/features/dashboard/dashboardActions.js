import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
import { logout } from "../auth/authSlice";
import { cleanStorage } from "../../../app/helpers/cleanStorage";
const fetchCounts = createAsyncThunk(
  "dashboard/fetchCounts",
  async (_, { dispatch, rejectWithValue }) => {
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
      if (error.response.status === 403) {
        cleanStorage();
        setTimeout(() => {
          dispatch(logout());
        }, 3000);
      }
      return rejectWithValue(error);
    }
  }
);

const fetchInventoryCounts = createAsyncThunk(
  "dashboard/fetchInventoryCounts",
  async (_, { dispatch, rejectWithValue }) => {
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
      if (error.response.status === 403) {
        cleanStorage();
        setTimeout(() => {
          dispatch(logout());
        }, 3000);
      }
      return rejectWithValue(error);
    }
  }
);

const fetchPartCounts = createAsyncThunk(
  "dashboard/fetchPartCounts",
  async (division, { dispatch, rejectWithValue }) => {
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
      if (error.response.status === 403) {
        cleanStorage();
        setTimeout(() => {
          dispatch(logout());
        }, 3000);
      }
      return rejectWithValue(error);
    }
  }
);

export { fetchCounts, fetchInventoryCounts, fetchPartCounts };
