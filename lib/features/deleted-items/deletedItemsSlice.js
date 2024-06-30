import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deletedItemsData: [
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Dart"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Suzuki"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo"],
      make: ["Alfa Romeo"],
      variant: "Frot-Mirror",
    },
  ],
};

export const deletedItemsSlice = createSlice({
  name: "deletedItems",
  initialState,
  reducers: {
    deleteItemsPermanently: (state, action) => {
      state.deletedItemsData.splice(action.payload, 1);
    },
  },
});

export const { deleteItemsPermanently } = deletedItemsSlice.actions;
export default deletedItemsSlice.reducer;
