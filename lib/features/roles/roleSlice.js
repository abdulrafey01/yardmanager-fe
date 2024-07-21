import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRolesByPage,
  addRole,
  deleteRole,
  updateRole,
  searchRoleByName,
} from "../../features/roles/roleActions";

const initialState = {
  rolesData: [],
  toastMsg: null,
  roleSearchData: [],
  error: null, // this state is just for debugging
  totalDataLength: 0,
  showEmployeeSideMenu: false,
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    deleteRole: (state, action) => {
      state.rolesData.splice(action.payload, 1);
      state.showDeleteRoleModal = true;
    },

    setShowEmployeeSideMenu: (state, action) => {
      state.showEmployeeSideMenu = action.payload;
    },
    resetState: (state) => {
      state = initialState;
    },
    resetRoleToast: (state) => {
      state.toastMsg = null;
    },
  },

  extraReducers: (builder) => {
    // Fetching roles by page
    builder.addCase(fetchRolesByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.rolesData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchRolesByPage.rejected, (state, action) => {
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

    // Add Role
    builder.addCase(addRole.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.rolesData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addRole.rejected, (state, action) => {
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

    // Delete Role
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.rolesData = state.rolesData.filter(
          (role) => role._id !== action.payload.data._id
        );
        state.totalDataLength = state.totalDataLength - 1;
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteRole.rejected, (state, action) => {
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

    // Update role
    builder.addCase(updateRole.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.rolesData = state.rolesData.map((role) => {
          if (role._id === action.payload.data._id) {
            return action.payload.data;
          }
          return role;
        });
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });
    builder.addCase(updateRole.rejected, (state, action) => {
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

    // Search role by name
    builder.addCase(searchRoleByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.roleSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchRoleByName.rejected, (state, action) => {
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

export const { setShowEmployeeSideMenu, resetState, resetRoleToast } =
  roleSlice.actions;
export default roleSlice.reducer;
