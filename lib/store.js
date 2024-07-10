import { configureStore } from "@reduxjs/toolkit";
import sharedReducer from "./features/shared/sharedSlice";

import invoiceReducer from "./features/invoice/invoiceSlice";
import roleReducer from "./features/roles/roleSlice";
import locationReducer from "./features/locations/locationSlice";
import partReducer from "./features/parts/partSlice";
import inventoryReducer from "./features/inventory/inventorySlice";
import deletedItemsReducer from "./features/deleted-items/deletedItemsSlice";
import vehicleReducer from "./features/vehicle/vehicleSlice";
import employeeReducer from "./features/employee/employeeSlice";
import authReducer from "./features/auth/authSlice";
import settingsReducer from "./features/settings/settingsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      shared: sharedReducer,
      invoice: invoiceReducer,
      roles: roleReducer,
      locations: locationReducer,
      parts: partReducer,
      inventory: inventoryReducer,
      deletedItems: deletedItemsReducer,
      vehicle: vehicleReducer,
      employee: employeeReducer,
      auth: authReducer,
      settings: settingsReducer,
    },
  });
};
