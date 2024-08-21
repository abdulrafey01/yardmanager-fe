import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, getLocalStorage } from "../../../app/helpers/storage";
import axios from "axios";

const fetchAllInventory = createAsyncThunk(
  "inventory/fetchAllInventory",
  async (body, { rejectWithValue }) => {
    let token;
    let companyId;

    if (body.isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
      companyId = JSON.parse(localStorage.getItem("companyId"));
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }

    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/inventory/all?${
          body.isAdmin
            ? body.totalOverview.value
              ? `&company=${body.totalOverview.id}` // for company id
              : `&company=${companyId}`
            : ""
        }`,
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
// Fetch Inventory by page
const fetchInventoryByPage = createAsyncThunk(
  "inventory/fetchInventoryByPage",
  async (body, { rejectWithValue }) => {
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

    // Define params
    let params = `page=${body.page}&limit=${body.limit}&search=${
      body.search ? body.search : ""
    }`;
    // if (body.search) {
    //   params = `search=${body.search}`;
    // } else if (body.page && body.limit) {

    // }

    // Api call
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/inventory/paginate?${params}${
          body.isAdmin // if isAdmin then 2 cases
            ? body.totalOverview // case 1 total inventory overview
              ? "&division=company"
              : `&company=${companyId}` // case 2 inventory overview by company
            : ""
        }`,
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
// Add Inventory api
const addInventory = createAsyncThunk(
  "inventory/addInventory",
  async (body, { rejectWithValue }) => {
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

    // Api call
    try {
      const { data } = await axios.post(
        `https://yardmanager-be.vercel.app/api/inventory/new${
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
      return rejectWithValue(error);
    }
  }
);

// Delete Inventory temporary
const deleteInventory = createAsyncThunk(
  "inventory/deleteInventory",
  async (body, { rejectWithValue }) => {
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

    // Api call
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/inventory/delete/${body.id}${
          body.isAdmin
            ? body.totalOverview.value
              ? `?company=${body.totalOverview.id}` // for company id
              : `?company=${companyId}`
            : ""
        }`,
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

// Update inventory api
const updateInventory = createAsyncThunk(
  "inventory/updateInventory",
  async (body, { rejectWithValue }) => {
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

    // Api call
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/inventory/s/${body.id}${
          body.isAdmin
            ? body.totalOverview.value
              ? `?company=${body.totalOverview.id}` // for company id
              : `?company=${companyId}`
            : ""
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
      return rejectWithValue(error);
    }
  }
);

// Search inventory by name
const searchInventoryByName = createAsyncThunk(
  "inventory/searchInventoryByName",
  async (body, { rejectWithValue }) => {
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
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/inventory/name?search=${
          body.val
        }${body.isAdmin ? `&company=${companyId}` : ""}`,
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
  fetchInventoryByPage,
  fetchAllInventory,
  addInventory,
  deleteInventory,
  updateInventory,
  searchInventoryByName,
};
