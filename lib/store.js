import { configureStore } from "@reduxjs/toolkit";

import invoiceReducer from "./features/invoice/invoiceSlice";
import roleReducer from "./features/roles/roleSlice";
import locationReducer from "./features/locations/locationSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      invoice: invoiceReducer,
      roles: roleReducer,
      locations: locationReducer,
    },
  });
};
