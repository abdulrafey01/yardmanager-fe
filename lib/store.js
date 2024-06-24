import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./features/invoice/invoiceSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      invoice: invoiceReducer,
    },
  });
};
