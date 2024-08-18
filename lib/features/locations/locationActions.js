import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
// If admin then search for related company

const fetchAllLocations = createAsyncThunk(
  "locations/fetchAllLocations",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
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
      return rejectWithValue(error);
    }
  }
);

// Fetch locations by page
const fetchLocationsByPage = createAsyncThunk(
  "locations/fetchLocationsByPage",
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

    let params = `page=${body.page}&limit=${body.limit}&search=${
      body.search ? body.search : ""
    }`;

    // if (body.search) {
    //   params = `search=${body.search}`;
    // } else if (body.page && body.limit) {
    //   params = ;
    // }
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/locations/paginate?${params}${
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
      return rejectWithValue(error);
    }
  }
);

// ADd location api
const addLocation = createAsyncThunk(
  "locations/addLocation",
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
        `https://yardmanager-be.vercel.app/api/locations/new${
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

// Delete location
const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
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
        `https://yardmanager-be.vercel.app/api/locations/s/${body.id}${
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

// Update location api
const updateLocation = createAsyncThunk(
  "locations/updateLocation",
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
        `https://yardmanager-be.vercel.app/api/locations/s/${body.id}${
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
// Search location by name
const searchLocationByName = createAsyncThunk(
  "locations/searchLocationByName",
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
        `https://yardmanager-be.vercel.app/api/locations/search?name=${
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
  fetchAllLocations,
  addLocation,
  deleteLocation,
  updateLocation,
  fetchLocationsByPage,
  searchLocationByName,
};
