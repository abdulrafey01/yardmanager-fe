import { createSlice } from "@reduxjs/toolkit";
import { updateCompany, updatePersonal } from "./profileActions";

const initalState = {
  toastMsg: null,
  error: null,
  companyData: null,
  personalData: null,
  imgsData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initalState,
  reducers: {
    resetToast: (state) => {
      state.toastMsg = null;
    },
  },
  extraReducers: (builder) => {
    // Update Company
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.companyData = action.payload.data;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(updateCompany.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Connection Problem";
      }
    });

    // Update personal
    builder.addCase(updatePersonal.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.personalData = action.payload.data;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(updatePersonal.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Connection Problem";
      }
    });
  },
});

export const { resetToast } = profileSlice.actions;
export default profileSlice.reducer;
