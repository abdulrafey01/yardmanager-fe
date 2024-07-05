import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllLocations,
  addLocation,
} from "../../features/locations/locationActions";
const initialState = {
  // locationData: [
  //   {
  //     locationName: "America",
  //   },
  //   {
  //     locationName: "Europe",
  //   },
  //   {
  //     locationName: "Asia",
  //   },
  //   {
  //     locationName: "Africa",
  //   },
  //   {
  //     locationName: "Australia",
  //   },
  //   {
  //     locationName: "America",
  //   },
  //   {
  //     locationName: "Europe",
  //   },
  //   {
  //     locationName: "Asia",
  //   },
  //   {
  //     locationName: "Africa",
  //   },
  //   {
  //     locationName: "Australia",
  //   },
  //   {
  //     locationName: "America",
  //   },
  //   {
  //     locationName: "Europe",
  //   },
  //   {
  //     locationName: "Asia",
  //   },
  //   {
  //     locationName: "Africa",
  //   },
  //   {
  //     locationName: "Australia",
  //   },
  //   {
  //     locationName: "America",
  //   },
  //   {
  //     locationName: "Europe",
  //   },
  //   {
  //     locationName: "Asia",
  //   },
  //   {
  //     locationName: "Africa",
  //   },
  //   {
  //     locationName: "Australia",
  //   },
  // ],
  locationData: [],
  error: null,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    deleteLocation: (state, action) => {
      state.locationData.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    // Fethcing all locations
    builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
      state.locationData = action.payload.data;
    });

    builder.addCase(fetchAllLocations.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Adding new location
    builder.addCase(addLocation.fulfilled, (state, action) => {
      state.locationData.push(action.payload.data);
    });

    builder.addCase(addLocation.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { deleteLocation } = locationSlice.actions;
export default locationSlice.reducer;
