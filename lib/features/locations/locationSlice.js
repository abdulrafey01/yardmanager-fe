import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllLocations,
  addLocation,
  deleteLocation,
  updateLocation,
  fetchLocationsByPage,
  searchLocationByName,
} from "../../features/locations/locationActions";
const initialState = {
  locationData: [],
  locationSearchData: [],
  toastMsg: null,
  error: null,
  totalDataLength: 0,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    resetLocToast: (state) => {
      state.toastMsg = null;
    },
    resetLocationSearchData: (state) => {
      state.locationSearchData = [];
    },
  },
  extraReducers: (builder) => {
    // Fethcing all locations
    builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
      // If success
      if (action.payload.success) {
        state.locationData = action.payload.data;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        // If failed
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchAllLocations.rejected, (state, action) => {
      // if error in request i.e error from server catch block
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

    // Fetching locations by page
    builder.addCase(fetchLocationsByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchLocationsByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        // state.toastMsg = { msg:action.payload.response.data.message, red: true }
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new location
    builder.addCase(addLocation.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addLocation.rejected, (state, action) => {
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

    // Delete location
    builder.addCase(deleteLocation.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationData = state.locationData.filter(
          (location) => location._id !== action.payload.data._id
        );
        state.totalDataLength = state.totalDataLength - 1;
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteLocation.rejected, (state, action) => {
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

    // Update Location
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.locationData = state.locationData.map((location) => {
          if (location._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return location;
          }
        });
        state.toastMsg = { msg: action.payload.message, red: false };
      } else if (action.payload.success === false) {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    // Search location by name
    builder.addCase(searchLocationByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchLocationByName.rejected, (state, action) => {
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

export const { resetLocToast, resetLocationSearchData } = locationSlice.actions;
export default locationSlice.reducer;
