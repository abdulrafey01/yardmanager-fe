import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInventoryByPage,
  addInventory,
  deleteInventory,
  updateInventory,
  searchInventoryByName,
} from "../../features/inventory/inventoryActions";

const initialState = {
  inventoryData: [],
  toastMsg: null,
  error: null, // this state is just for debugging
  totalDataLength: 0,
  inventorySearchData: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Fetching inventory by page
    builder.addCase(fetchInventoryByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.inventoryData = action.payload.data;
        state.totalDataLength = action.payload.pagination.total;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchInventoryByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Add Inventory
    builder.addCase(addInventory.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.inventoryData.unshift(action.payload.data);
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(addInventory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Delete Inventory
    builder.addCase(deleteInventory.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.inventoryData = state.inventoryData.filter(
          (inventory) => inventory._id !== action.payload.data._id
        );
        state.totalDataLength = state.totalDataLength - 1;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(deleteInventory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Update inventory
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.inventoryData = state.inventoryData.map((inventory) => {
          if (inventory._id === action.payload.data._id) {
            return action.payload.data;
          }
          return inventory;
        });
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });
    builder.addCase(updateInventory.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Search inventory by name
    builder.addCase(searchInventoryByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.inventorySearchData = action.payload.data;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(searchInventoryByName.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export default inventorySlice.reducer;
