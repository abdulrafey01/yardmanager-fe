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
  previewModal: false,
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
    setPreviewModal: (state, action) => {
      state.previewModal = action.payload;
    },
    resetInvoiceToast: (state) => {
      state.toastMsg = null;
    },
  },
  extraReducers: (builder) => {
    // Fetching invoices by page
    builder.addCase(fetchInvoicesByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchInvoicesByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new invoice
    builder.addCase(addInvoice.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addInvoice.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
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
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteInvoice.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
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
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(updateInvoice.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Search invoice by name
    builder.addCase(searchInvoiceByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.invoiceSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchInvoiceByName.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export const { resetState, setPreviewModal, resetInvoiceToast } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
