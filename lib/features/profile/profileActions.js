import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../../app/helpers/storage";
// Update Company
const updateCompany = createAsyncThunk(
  "profile/updateCompany",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/users/company`, // update company
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

// Update personal data
const updatePersonal = createAsyncThunk(
  "profile/updatePersonal",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/employees/s/${body.id}`, // update personal
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

// Update user data
const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (body, { rejectWithValue }) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `https://yardmanager-be.vercel.app/api/users/update`, // update personal
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

export { updateCompany, updatePersonal, updateUser };
