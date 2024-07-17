import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";

const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token");
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
    const token = getCookie("token");
    let params;
    if (body.search) {
      params = `search=${body.search}`;
    } else if (body.page && body.limit && body.filter !== undefined) {
      params = `page=${body.page}&limit=${body.limit}&filter_active=${body.filter}`;
    } else {
      params = `page=${body.page}&limit=${body.limit}`;
    }
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/employees/paginate?${params}`,
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
    const token = getCookie("token");
    try {
      const { data } = await axios.post(
        "https://yardmanager-be.vercel.app/api/employees/new",
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

// Delete employee
const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.delete(
        `https://yardmanager-be.vercel.app/api/employees/s/${id}`,
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
    const token = getCookie("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/employees/s/${body.id}`,
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
    const token = getCookie("token");
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
