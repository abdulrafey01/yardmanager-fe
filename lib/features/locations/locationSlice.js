import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationData: [
    {
      locationName: "America",
    },
    {
      locationName: "Europe",
    },
    {
      locationName: "Asia",
    },
    {
      locationName: "Africa",
    },
    {
      locationName: "Australia",
    },
    {
      locationName: "America",
    },
    {
      locationName: "Europe",
    },
    {
      locationName: "Asia",
    },
    {
      locationName: "Africa",
    },
    {
      locationName: "Australia",
    },
    {
      locationName: "America",
    },
    {
      locationName: "Europe",
    },
    {
      locationName: "Asia",
    },
    {
      locationName: "Africa",
    },
    {
      locationName: "Australia",
    },
    {
      locationName: "America",
    },
    {
      locationName: "Europe",
    },
    {
      locationName: "Asia",
    },
    {
      locationName: "Africa",
    },
    {
      locationName: "Australia",
    },
  ],
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    deleteLocation: (state, action) => {
      state.locationData.splice(action.payload, 1);
      state.showDeleteLocationModal = true;
    },
  },
});

export const { deleteLocation } = locationSlice.actions;
export default locationSlice.reducer;
