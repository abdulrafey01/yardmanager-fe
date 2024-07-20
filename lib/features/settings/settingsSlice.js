import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorToggle: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setColorToggle: (state, action) => {
      state.colorToggle = action.payload;
    },
  },
});

export const { setColorToggle } = settingsSlice.actions;

export default settingsSlice.reducer;
