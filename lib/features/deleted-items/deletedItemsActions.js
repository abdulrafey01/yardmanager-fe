import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

// Fetch Deleted Items by page
const fetchDeletedItemsByPage = createAsyncThunk(
  "deletedItems/fetchDeletedItemsByPage",
  async (pageNumber, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/inventory/paginate?deleted=true&?page=${pageNumber}`,
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

// Delete Inventory Permanently
const deleteInventoryPermanently = createAsyncThunk(
  "inventory/deleteInventory",
  async (id, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/inventory/s/${id}`,
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

const restoreInventory = createAsyncThunk(
  "inventory/restoreInventory",
  async (id, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/inventory/restore/${id}`,
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

export {
  fetchDeletedItemsByPage,
  deleteInventoryPermanently,
  restoreInventory,
};
