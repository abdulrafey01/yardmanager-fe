import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmModal: false,
};
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setShowConfirmModal: (state, action) => {
      state.confirmModal = action.payload;
    },
  },
});

export const { setShowConfirmModal } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
