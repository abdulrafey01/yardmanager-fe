import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
import { cleanStorage } from "../../../app/helpers/cleanStorage";
import { logout } from "../auth/authSlice";

// Fetch invoices by page
const fetchInvoicesByPage = createAsyncThunk(
  "invoices/fetchInvoicesByPage",
  async (body, { dispatch, rejectWithValue }) => {
    let token;
    let companyId;

    // role based token
    if (body.isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
      companyId = JSON.parse(localStorage.getItem("companyId"));
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }

    let params;
    if (body.search) {
      params = `search=${body.search}`;
    } else if (body.page && body.limit) {
      params = `page=${body.page}&limit=${body.limit}`;
    }
    try {
      const { data } = await axios.get(
        ` https://yardmanager-be.vercel.app/api/invoices/paginate?${params}${
          body.isAdmin ? `&company=${companyId}` : ""
        }`,
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

// ADd invoice api
const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (body, { dispatch, rejectWithValue }) => {
    let token;
    let companyId;

    // role based token
    if (body.isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
      companyId = JSON.parse(localStorage.getItem("companyId"));
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }
    try {
      const { data } = await axios.post(
        `https://yardmanager-be.vercel.app/api/invoices/new${
          body.isAdmin ? `?company=${companyId}` : ""
        }`,
        body.data,
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

// Delete invoice
const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (body, { dispatch, rejectWithValue }) => {
    let token;
    let companyId;

    // role based token
    if (body.isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
      companyId = JSON.parse(localStorage.getItem("companyId"));
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }

    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/invoices/s/${body.id}${
          body.isAdmin ? `?company=${companyId}` : ""
        }`,
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

// Update invoice api
const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async (body, { dispatch, rejectWithValue }) => {
    let token;
    let companyId;

    // role based token
    if (body.isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
      companyId = JSON.parse(localStorage.getItem("companyId"));
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/invoices/s/${body.id}${
          body.isAdmin ? `?company=${companyId}` : ""
        }`,
        body.formData,
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
// Search invoice by name
const searchInvoiceByName = createAsyncThunk(
  "invoices/searchInvoiceByName",
  async (searchValue, { dispatch, rejectWithValue }) => {
    const token =
      getCookie("token") ||
      window?.sessionStorage.getItem("token") ||
      getCookie("adminToken") ||
      window?.sessionStorage.getItem("adminToken");
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
export {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  fetchInvoicesByPage,
  searchInvoiceByName,
};
