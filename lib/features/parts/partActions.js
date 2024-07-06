import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
// Fetch Parts by page
const fetchPartsByPage = createAsyncThunk(
  "parts/fetchPartsByPage",
  async (pageNumber, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/parts/paginate/?page=${pageNumber}`,
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
// Add Part api
const addPart = createAsyncThunk(
  "parts/addPart",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/parts/new",
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

// Delete Part
const deletePart = createAsyncThunk(
  "parts/deletePart",
  async (id, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/parts/s/${id}`,
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

// Update part api
const updatePart = createAsyncThunk(
  "parts/updatePart",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/parts/s/${body.id}`,
        body.formData,
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
export { fetchPartsByPage, addPart, deletePart, updatePart };
