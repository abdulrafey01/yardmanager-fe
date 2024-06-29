import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesData: [
    {
      srNo: 1,
      roleName: "Admin",
      employees: 5,
    },
    {
      srNo: 2,

      roleName: "SuperAdmin",
      employees: 5,
    },
    {
      srNo: 3,
      roleName: "Staff",
      employees: 5,
    },
    {
      srNo: 4,
      roleName: "Employee",
      employees: 5,
    },
    {
      srNo: 5,
      roleName: "CTO",
      employees: 5,
    },
    {
      srNo: 6,
      roleName: "CFO",
      employees: 5,
    },
    {
      srNo: 7,
      roleName: "Admin",
      employees: 5,
    },
    { srNo: 7, roleName: "SuperAdmin", employees: 5 },
    { srNo: 7, roleName: "Staff", employees: 5 },
    { srNo: 7, roleName: "Employee", employees: 5 },
    { srNo: 7, roleName: "CTO", employees: 5 },
    { srNo: 7, roleName: "CFO", employees: 5 },
    { srNo: 7, roleName: "Admin", employees: 5 },
    { srNo: 7, roleName: "SuperAdmin", employees: 5 },
    { srNo: 7, roleName: "Staff", employees: 5 },
    { srNo: 7, roleName: "Employee", employees: 5 },
    { srNo: 7, roleName: "CTO", employees: 5 },
    { srNo: 7, roleName: "CFO", employees: 5 },
  ],
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    deleteRole: (state, action) => {
      state.rolesData.splice(action.payload, 1);
      state.showDeleteRoleModal = true;
    },
  },
});

export const { deleteRole } = roleSlice.actions;
export default roleSlice.reducer;
