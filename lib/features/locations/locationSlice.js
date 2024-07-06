import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllLocations,
  addLocation,
  deleteLocation,
  updateLocation,
  fetchLocationsByPage,
} from "../../features/locations/locationActions";
const initialState = {
  locationData: [],
  toastMsg: null,
  error: null,
  totalDataLength: 0,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fethcing all locations
    builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
      // If success
      if (action.payload.success) {
        state.locationData = action.payload.data;
        state.toastMsg = action.payload.message;
      } else {
        // If failed
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchAllLocations.rejected, (state, action) => {
      // if error in request i.e error from server catch block
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Fetching locations by page
    builder.addCase(fetchLocationsByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchLocationsByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        // state.toastMsg = action.payload.response.data.error;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new location
    builder.addCase(addLocation.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationData.push(action.payload.data);
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(addLocation.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.error;
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
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(deleteLocation.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Update Location
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.locationData = state.locationData.map((location) => {
          if (location._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return location;
          }
        });
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });
  },
});

export default locationSlice.reducer;
