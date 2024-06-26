import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesData: [
    {
      roleName: "Admin",
      employees: 5,
    },
    {
      roleName: "SuperAdmin",
      employees: 5,
    },
    {
      roleName: "Staff",
      employees: 5,
    },
    {
      roleName: "Employee",
      employees: 5,
    },
    {
      roleName: "CTO",
      employees: 5,
    },
    {
      roleName: "CFO",
      employees: 5,
    },
    {
      roleName: "Admin",
      employees: 5,
    },
    {
      roleName: "SuperAdmin",
      employees: 5,
    },
    {
      roleName: "Staff",
      employees: 5,
    },
    {
      roleName: "Employee",
      employees: 5,
    },
    {
      roleName: "CTO",
      employees: 5,
    },
    {
      roleName: "CFO",
      employees: 5,
    },
    {
      roleName: "Admin",
      employees: 5,
    },
    {
      roleName: "SuperAdmin",
      employees: 5,
    },
    {
      roleName: "Staff",
      employees: 5,
    },
    {
      roleName: "Employee",
      employees: 5,
    },
    {
      roleName: "CTO",
      employees: 5,
    },
    {
      roleName: "CFO",
      employees: 5,
    },
  ],
  showActionMenu: false,
  showDeleteRoleModal: false,
  deleteRoleIndex: -1,
  showSideRoleMenu: {
    value: false,
    mode: "add",
  },
  showSuccessModal: false,
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    deleteRole: (state, action) => {
      state.rolesData.splice(action.payload, 1);
      state.showDeleteRoleModal = true;
    },
    setDeleteRoleIndex: (state, action) => {
      state.deleteRoleIndex = action.payload;
    },
    setShowDeleteRoleModal: (state, action) => {
      state.showDeleteRoleModal = action.payload;
    },
    setShowSideRoleMenu: (state, action) => {
      state.showSideRoleMenu = action.payload;
    },
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
  },
});

export const {
  deleteRole,
  setDeleteRoleIndex,
  setShowDeleteRoleModal,
  setShowSideRoleMenu,
  setShowSuccessModal,
} = roleSlice.actions;
export default roleSlice.reducer;
