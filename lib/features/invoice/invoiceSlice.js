import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllInvoices,
  addInvoice,
  deleteInvoice,
  updateInvoice,
  fetchInvoicesByPage,
  searchInvoiceByName,
} from "../../features/invoice/invoiceActions";
const initialState = {
  invoiceData: [],
  invoiceSearchData: [],
  toastMsg: null,
  error: null,
  totalDataLength: 0,
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching invoices by page
    builder.addCase(fetchInvoicesByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchInvoicesByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        // state.toastMsg = action.payload.response.data.error;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new invoice
    builder.addCase(addInvoice.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceData.push(action.payload.data);
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(addInvoice.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.error;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Delete invoice
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceData = state.invoiceData.filter(
          (invoice) => invoice._id !== action.payload.data._id
        );
        state.totalDataLength = state.totalDataLength - 1;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(deleteInvoice.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Update Invoice
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceData = state.invoiceData.map((invoice) => {
          if (invoice._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return invoice;
          }
        });
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    // Search invoice by name
    builder.addCase(searchInvoiceByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceSearchData = action.payload.data;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(searchInvoiceByName.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export default invoiceSlice.reducer;
