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
};

export const partSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    deletePart: (state, action) => {
      state.partData.splice(action.payload, 1);
      state.showDeletePartModal = true;
    },
  },
});

export const { deletePart } = partSlice.actions;
export default partSlice.reducer;
