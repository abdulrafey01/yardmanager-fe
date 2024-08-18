import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "https://yardmanager-be.vercel.app/api/employees/all",
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

// Fetch employees by page
const fetchEmployeesByPage = createAsyncThunk(
  "employees/fetchEmployeesByPage",
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
    let params;
    if (body.page && body.limit && body.filter !== undefined) {
      params = `page=${body.page}&limit=${body.limit}&filter_active=${
        body.filter
      }&search=${body.search ? body.search : ""}`;
    } else {
      params = `page=${body.page}&limit=${body.limit}&search=${
        body.search ? body.search : ""
      }`;
    }
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/employees/paginate?${params}${
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

// ADd employee api
const addEmployee = createAsyncThunk(
  "employees/addEmployee",
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
        `https://yardmanager-be.vercel.app/api/employees/new${
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

// Delete employee
const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
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
        `https://yardmanager-be.vercel.app/api/employees/s/${body.id}${
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

// Update employee api
const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
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
        `https://yardmanager-be.vercel.app/api/employees/s/${body.id}${
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
// Search employee by name
const searchEmployeeByName = createAsyncThunk(
  "employees/searchEmployeeByName",
  async (searchValue, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");

    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/employees/search?name=${searchValue}`,
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
  fetchAllEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  fetchEmployeesByPage,
  searchEmployeeByName,
};
