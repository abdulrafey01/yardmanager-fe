import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
// Fetch Subscriptions by page
const fetchSubscriptionsByPage = createAsyncThunk(
  "subscriptions/fetchSubscriptionsByPage",
  async (body, { rejectWithValue }) => {
    let companyId;

    // role based token
    let token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");

    let params;
    if (body.search) {
      params = `search=${body.search}`;
    } else if (body.page && body.limit) {
      params = `offset=${body.page}&limit=${body.limit}`;
    }
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/subscription/all?&${params}`,
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
// Add Subscription api
const addSubscription = createAsyncThunk(
  "subscriptions/addSubscription",
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
      const { data } = await axios.post(
        `https://yardmanager-be.vercel.app/api/subscriptions/new${
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

// Delete Subscription
const deleteSubscription = createAsyncThunk(
  "subscriptions/deleteSubscription",
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
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/subscriptions/s/${body.id}${
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
      return rejectWithValue(error);
    }
  }
);

// Update subscription api
const updateSubscription = createAsyncThunk(
  "subscriptions/updateSubscription",
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
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/subscriptions/s/${body.id}${
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
      return rejectWithValue(error);
    }
  }
);

// Search subscription by name
const searchSubscriptionByName = createAsyncThunk(
  "subscriptions/searchSubscriptionByName",
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
        `https://yardmanager-be.vercel.app/api/subscriptions/search?name=${
          body.val
        }${
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
export {
  fetchSubscriptionsByPage,
  addSubscription,
  deleteSubscription,
  updateSubscription,
  searchSubscriptionByName,
};
