import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

// Fetch Roles by page
const fetchRolesByPage = createAsyncThunk(
  "roles/fetchRolesByPage",
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
    //   params = `page=${body.page}&limit=${body.limit}`;
    // }

    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/roles/paginate?${params}${
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
// Add Role api
const addRole = createAsyncThunk(
  "roles/addRole",
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
        `https://yardmanager-be.vercel.app/api/roles/new${
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

// Delete Role
const deleteRole = createAsyncThunk(
  "roles/deleteRole",
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
        `https://yardmanager-be.vercel.app/api/roles/s/${body.id}${
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

// Update role api
const updateRole = createAsyncThunk(
  "roles/updateRole",
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
        `https://yardmanager-be.vercel.app/api/roles/s/${body.id}${
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

// Search role by name
const searchRoleByName = createAsyncThunk(
  "roles/searchRoleByName",
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
        `https://yardmanager-be.vercel.app/api/roles/search?name=${body.val}${
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
export { fetchRolesByPage, addRole, deleteRole, updateRole, searchRoleByName };
