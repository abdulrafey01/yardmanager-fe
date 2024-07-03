import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeData: [
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
    {
      srNo: 1,
      name: "John",
      email: "j@j.com",
      role: "Manager",
      position: "Admin",
      hireDate: "01/01/2022",
      status: "Active",
    },
    {
      srNo: 2,
      name: "Babar Azam",
      email: "j@j.com",
      role: "Manager",
      position: "CFO",
      hireDate: "01/01/2022",
      status: "InActive",
    },
  ],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    deleteEmployee: (state, action) => {
      state.employeeData.splice(action.payload, 1);
    },
  },
});

export const { deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
