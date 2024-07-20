import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

// Fetch Roles by page
const fetchRolesByPage = createAsyncThunk(
  "roles/fetchRolesByPage",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    let params;
    if (body.search) {
      params = `search=${body.search}`;
    } else if (body.page && body.limit) {
      params = `page=${body.page}&limit=${body.limit}`;
    }
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/roles/paginate?${params}`,
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
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/roles/new",
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

// Delete Role
const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/roles/s/${id}`,
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
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/roles/s/${body.id}`,
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
  async (searchValue, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/roles/search?name=${searchValue}`,
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
