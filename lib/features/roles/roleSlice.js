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
  ],
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
});

export default roleSlice.reducer;
