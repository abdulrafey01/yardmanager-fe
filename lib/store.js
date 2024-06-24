import { configureStore } from "@reduxjs/toolkit";

import invoiceReducer from "./features/invoice/invoiceSlice";
import roleReducer from "./features/roles/roleSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      invoice: invoiceReducer,
      roles: roleReducer,
    },
  });
};
