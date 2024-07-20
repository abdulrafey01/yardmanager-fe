import { createSlice } from "@reduxjs/toolkit";
import {
  addToInventory,
  addVehicle,
  deleteVehicle,
  fetchVehiclesByPage,
  updateVehicle,
  vinDecode,
} from "./vehicleActions";

const initialState = {
  vehicleData: [],
  toastMsg: null,
  error: null,
  totalDataLength: 0,
  addedToInv: false,
  vinDecodedData: null,
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVinDecodedData: (state, action) => {
      state.vinDecodedData = null;
    },
  },
  extraReducers: (builder) => {
    // VIN decode
    builder.addCase(vinDecode.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.vinDecodedData = action.payload.data;
        state.toastMsg = { msg: "VIN Decoded", red: false };
      } else {
        state.toastMsg = { msg: "VIN decode failed", red: true };
      }
    });

    builder.addCase(vinDecode.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: "VIN decode failed",
          red: true,
        };
      } else {
        state.toastMsg = {
          msg: "Conncetion Problem",
          red: true,
        };
      }
    });

    // Fetch by page
    builder.addCase(fetchVehiclesByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.vehicleData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
      } else {
        state.toastMsg = { msg: "Fetch Vehicles failed", red: true };
      }
    });

    builder.addCase(fetchVehiclesByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Add Vehicle
    builder.addCase(addVehicle.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.vehicleData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addVehicle.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Delete vehicle
    builder.addCase(deleteVehicle.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.vehicleData = state.vehicleData.filter(
          (vehicle) => vehicle._id !== action.payload.data._id
        );
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteVehicle.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Update Vehicle
    builder.addCase(updateVehicle.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.vehicleData = state.vehicleData.map((vehicle) => {
          if (vehicle._id === action.payload.data._id) {
            return action.payload.data;
          }
          return vehicle;
        });
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });
    builder.addCase(updateVehicle.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Add to inventory
    builder.addCase(addToInventory.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.toastMsg = { msg: action.payload.message, red: false };
        state.addedToInv = true;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addToInventory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export const { setVinDecodedData } = vehicleSlice.actions;
export default vehicleSlice.reducer;
