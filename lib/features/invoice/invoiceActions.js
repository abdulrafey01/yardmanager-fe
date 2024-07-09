import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

// Fetch invoices by page
const fetchInvoicesByPage = createAsyncThunk(
  "invoices/fetchInvoicesByPage",
  async (pageNumber, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/invoices/paginate/?page=${pageNumber}`,
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

// ADd invoice api
const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/invoices/new",
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

// Delete invoice
const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (id, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/invoices/s/${id}`,
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

// Update invoice api
const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/invoices/s/${body.id}`,
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
// Search invoice by name
const searchInvoiceByName = createAsyncThunk(
  "invoices/searchInvoiceByName",
  async (searchValue, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/invoices/search?name=${searchValue}`,
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
  addInvoice,
  deleteInvoice,
  updateInvoice,
  fetchInvoicesByPage,
  searchInvoiceByName,
};
