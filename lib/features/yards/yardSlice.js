import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllYards,
  addYard,
  deleteYard,
  updateYard,
  fetchYardsByPage,
  searchYardByName,
} from "../../features/yards/yardActions";

const initialState = {
  yardData: [],
  yardSearchData: [],
  toastMsg: null,
  error: null,
  totalDataLength: 0,
};

export const yardSlice = createSlice({
  name: "yards",
  initialState,
  reducers: {
    resetYardToast: (state) => {
      state.toastMsg = null;
    },
    resetYardSearchData: (state) => {
      state.yardSearchData = [];
    },
  },
  extraReducers: (builder) => {
    // Fethcing all yards
    builder.addCase(fetchAllYards.fulfilled, (state, action) => {
      // If success
      if (action.payload.success) {
        state.yardData = action.payload.data;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        // If failed
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchAllYards.rejected, (state, action) => {
      // if error in request i.e error from server catch block
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Fetching yards by page
    builder.addCase(fetchYardsByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.yardData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchYardsByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        // state.toastMsg = { msg:action.payload.response.data.message, red: true }
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new yard
    builder.addCase(addYard.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.yardData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addYard.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Delete yard
    builder.addCase(deleteYard.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.yardData = state.yardData.filter(
          (yard) => yard._id !== action.payload.data._id
        );
        state.totalDataLength = state.totalDataLength - 1;
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteYard.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Update Yard
    builder.addCase(updateYard.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.yardData = state.yardData.map((yard) => {
          if (yard._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return yard;
          }
        });
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    // Search yard by name
    builder.addCase(searchYardByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.yardSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchYardByName.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action.payload.response.data.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export const { resetYardToast, resetYardSearchData } = yardSlice.actions;
export default yardSlice.reducer;
