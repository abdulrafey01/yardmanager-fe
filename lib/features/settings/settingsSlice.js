import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceToggle: true,
  imageToggle: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPriceToggle: (state, action) => {
      state.priceToggle = action.payload;
    },
    setImageToggle: (state, action) => {
      state.imageToggle = action.payload;
    },
  },
});

export const { setImageToggle, setPriceToggle } = settingsSlice.actions;

export default settingsSlice.reducer;
