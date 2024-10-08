import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
// If admin then search for related company

const fetchAllYards = createAsyncThunk(
  "yards/fetchAllYards",
  async (_, { rejectWithValue }) => {
    const token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
    try {
      const { data } = await axios.get(
        "https://yardmanager-be.vercel.app/api/company/all",
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

// Fetch yards by page
const fetchYardsByPage = createAsyncThunk(
  "yards/fetchYardsByPage",
  async (body, { rejectWithValue }) => {
    let token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");

    let params;

    // if (body.search) {
    //   params = `search=${body.search}`;
    // } else if (body.page && body.limit) {
    // }
    params = `page=${body.page}&limit=${body.limit}&search=${
      body.search ? body.search : ""
    }`;

    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/company/paginate?${params}`,
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

// ADd yard api
const addYard = createAsyncThunk(
  "yards/addYard",
  async (body, { rejectWithValue }) => {
    let token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");

    try {
      const { data } = await axios.post(
        `https://yardmanager-be.vercel.app/api/users/register`,
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

// Delete yard
const deleteYard = createAsyncThunk(
  "yards/deleteYard",
  async (body, { rejectWithValue }) => {
    let token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");

    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/company/s/${body.id}`,
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

// Update yard api
const updateYard = createAsyncThunk(
  "yards/updateYard",
  async (body, { rejectWithValue }) => {
    let token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");

    try {
      const { data: data1 } = await axios.put(
        `https://yardmanager-be.vercel.app/api/company/s/${body.id}`, // update company,
        body.companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data: data2 } = await axios.put(
        `https://yardmanager-be.vercel.app/api/users/s/${body.userId}`, // update user,
        body.userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data2;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Search yard by name
const searchYardByName = createAsyncThunk(
  "yards/searchYardByName",
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
        `https://yardmanager-be.vercel.app/api/company/name/${body.val}`,
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
  fetchAllYards,
  addYard,
  deleteYard,
  updateYard,
  fetchYardsByPage,
  searchYardByName,
};
