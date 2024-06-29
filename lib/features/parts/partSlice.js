import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partData: [
    {
      name: "Paddle Shifter",
      variants: ["Alfa Romeo", "Chevrolet"],
    },
    {
      name: "Climate Control Sensor",
      variants: ["Alfa Romeo"],
    },
    {
      name: "Paddle Shifter",
      variants: ["Alfa Romeo", "Chevrolet"],
    },
    {
      name: "Climate Control Sensor",
      variants: ["Alfa Romeo"],
    },
    {
      name: "Paddle Shifter",
      variants: ["Alfa Romeo", "Chevrolet"],
    },
    {
      name: "Climate Control Sensor",
      variants: ["Alfa Romeo"],
    },
    {
      name: "Paddle Shifter",
      variants: ["Alfa Romeo", "Chevrolet"],
    },
  ],
  showActionMenu: false,
  showDeletePartModal: false,
  deletePartIndex: -1,
  showPartSideMenu: {
    value: false,
    mode: "add",
  },
  showSuccessModal: false,
};

export const partSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    deletePart: (state, action) => {
      state.partData.splice(action.payload, 1);
      state.showDeletePartModal = true;
    },
    setDeletePartIndex: (state, action) => {
      state.deletePartIndex = action.payload;
    },
    setShowDeletePartModal: (state, action) => {
      state.showDeletePartModal = action.payload;
    },
    setShowPartSideMenu: (state, action) => {
      state.showPartSideMenu = action.payload;
    },
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
  },
});

export const {
  deletePart,
  setDeletePartIndex,
  setShowDeletePartModal,
  setShowPartSideMenu,
  setShowSuccessModal,
} = partSlice.actions;
export default partSlice.reducer;
