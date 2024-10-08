import { createSlice } from "@reduxjs/toolkit";
import {
  deleteInventoryPermanently,
  fetchDeletedItemsByPage,
  restoreInventory,
} from "../deleted-items/deletedItemsActions";

const initialState = {
  deletedItemsData: [],
  toastMsg: null,
  error: null, // this state is just for debugging
  totalDataLength: 0,

  showRestoreModal: false,
};

export const deletedItemsSlice = createSlice({
  name: "deletedItems",
  initialState,
  reducers: {
    setShowRestoreModal: (state, action) => {
      state.showRestoreModal = action.payload;
    },
    resetDelToast: (state) => {
      state.toastMsg = null;
    },
  },
  extraReducers: (builder) => {
    // fetch deleted items by page
    builder.addCase(fetchDeletedItemsByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.deletedItemsData = action.payload.data;
        state.totalDataLength = action.payload.pagination.total;
        // state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchDeletedItemsByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Connection Problem";
      }
    });

    // Delete Inventory Permanently
    builder.addCase(deleteInventoryPermanently.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.deletedItemsData = state.deletedItemsData.filter(
          (inventory) => inventory._id !== action.payload.data._id
        );
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteInventoryPermanently.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Connection Problem";
      }
    });

    // Restore Inventory
    builder.addCase(restoreInventory.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.deletedItemsData = state.deletedItemsData.filter(
          (inventory) => inventory._id !== action.payload.data._id
        );
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(restoreInventory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Connection Problem";
      }
    });
  },
});

export const { setShowRestoreModal, resetDelToast } = deletedItemsSlice.actions;
export default deletedItemsSlice.reducer;
