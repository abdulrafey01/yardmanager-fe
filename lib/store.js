import { configureStore } from "@reduxjs/toolkit";

import invoiceReducer from "./features/invoice/invoiceSlice";
import roleReducer from "./features/roles/roleSlice";
import locationReducer from "./features/locations/locationSlice";
import partReducer from "./features/parts/partSlice";
import inventoryReducer from "./features/inventory/inventorySlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      invoice: invoiceReducer,
      roles: roleReducer,
      locations: locationReducer,
      parts: partReducer,
      inventory: inventoryReducer,
    },
  });
};
