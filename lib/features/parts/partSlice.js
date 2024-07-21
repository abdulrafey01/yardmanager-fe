import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPartsByPage,
  addPart,
  deletePart,
  updatePart,
  searchPartByName,
} from "../../features/parts/partActions";

const initialState = {
  partData: [],
  partSearchData: [],
  toastMsg: null,
  error: null, // this state is just for debugging
  totalDataLength: 0,
};

export const partSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    deletePart: (state, action) => {
      state.partData.splice(action.payload, 1);
      state.showDeletePartModal = true;
    },
    resetPartToast: (state) => {
      state.toastMsg = null;
    },
  },

  extraReducers: (builder) => {
    // Fetching parts by page
    builder.addCase(fetchPartsByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.partData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchPartsByPage.rejected, (state, action) => {
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

    // Add Part
    builder.addCase(addPart.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.partData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addPart.rejected, (state, action) => {
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

    // Delete Part
    builder.addCase(deletePart.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.partData = state.partData.filter(
          (part) => part._id !== action.payload.data._id
        );
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deletePart.rejected, (state, action) => {
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

    // Update part
    builder.addCase(updatePart.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.partData = state.partData.map((part) => {
          if (part._id === action.payload.data._id) {
            return action.payload.data;
          }
          return part;
        });
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });
    builder.addCase(updatePart.rejected, (state, action) => {
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

    // Search part by name
    builder.addCase(searchPartByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.partSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchPartByName.rejected, (state, action) => {
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

export const { resetPartToast } = partSlice.actions;
export default partSlice.reducer;
