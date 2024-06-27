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
  showActionMenu: false,
  showDeleteLocationModal: false,
  deleteLocationIndex: -1,
  showLocationSideMenu: {
    value: false,
    mode: "add",
  },
  showSuccessModal: false,
};

export const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    deleteLocation: (state, action) => {
      state.locationData.splice(action.payload, 1);
      state.showDeleteLocationModal = true;
    },
    setDeleteLocationIndex: (state, action) => {
      state.deleteLocationIndex = action.payload;
    },
    setShowDeleteLocationModal: (state, action) => {
      state.showDeleteLocationModal = action.payload;
    },
    setShowLocationSideMenu: (state, action) => {
      state.showLocationSideMenu = action.payload;
    },
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
  },
});

export const {
  deleteLocation,
  setDeleteLocationIndex,
  setShowDeleteLocationModal,
  setShowLocationSideMenu,
  setShowSuccessModal,
} = locationSlice.actions;
export default locationSlice.reducer;
