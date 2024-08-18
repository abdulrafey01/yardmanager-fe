import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../../app/helpers/storage";
import axios from "axios";
const fetchVehiclesByPage = createAsyncThunk(
  "vehicle/fetchVehiclesByPage",
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
    try {
      const { data } = await axios.get(
        `https://yardmanager-be.vercel.app/api/vehicles/paginate?${params}${
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

// VIn decode api
// const vinDecode = createAsyncThunk(
//   "vehicle/vinDecode",
//   async (body, { rejectWithValue }) => {
//     let token;
//     let companyId;

//     // role based token
//     if (body.isAdmin) {
//       token =
//         getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
//       companyId = JSON.parse(localStorage.getItem("companyId"));
//     } else {
//       token = getCookie("token") || window?.sessionStorage.getItem("token");
//     }
//     try {
//       const { data } = await axios.get(
//         `https://api.api-ninjas.com/v1/vinlookup?vin= + ${body.number}`,

//         {
//           headers: {
//             "X-Api-Key": process.env.NEXT_PUBLIC_VIN_API_KEY,
//           },
//         }
//       );
//       return {
//         success: true,
//         message: "Vin decoded successfully",
//         data: data,
//       };
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
const vinDecode = createAsyncThunk(
  "vehicle/vinDecode",
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
        `https://yardmanager-be.vercel.app/api/vehicles/decode/${body.number}${
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

// Add Vehicle api
const addVehicle = createAsyncThunk(
  "vehicle/addVehicle",
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
        `https://yardmanager-be.vercel.app/api/vehicles/new${
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

const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
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
        `https://yardmanager-be.vercel.app/api/vehicles/s/${body.id}${
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

const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
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
        `https://yardmanager-be.vercel.app/api/vehicles/s/${body.id}${
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

const addToInventory = createAsyncThunk(
  "vehicle/addToInventory",
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
        `https://yardmanager-be.vercel.app/api/vehicles/s/${body.id}/inventory${
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
export {
  vinDecode,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  addToInventory,
  fetchVehiclesByPage,
};
