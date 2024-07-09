import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  fetchEmployeesByPage,
  searchEmployeeByName,
} from "../../features/employee/employeeActions";
const initialState = {
  employeeData: [],
  employeeSearchData: [],
  toastMsg: null,
  error: null,
  totalDataLength: 0,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fethcing all employees
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      // If success
      if (action.payload.success) {
        state.employeeData = action.payload.data;
        state.toastMsg = action.payload.message;
      } else {
        // If failed
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      // if error in request i.e error from server catch block
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Fetching employees by page
    builder.addCase(fetchEmployeesByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(fetchEmployeesByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new employee
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeData.unshift(action.payload.data);
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(addEmployee.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Delete employee
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeData = state.employeeData.filter(
          (employee) => employee._id !== action.payload.data._id
        );
        state.totalDataLength = state.totalDataLength - 1;
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(deleteEmployee.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Update Employee
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeData = state.employeeData.map((employee) => {
          if (employee._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return employee;
          }
        });
        state.toastMsg = action.payload.message;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    // Search employee by name
    builder.addCase(searchEmployeeByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeSearchData = action.payload.data;
      } else {
        state.toastMsg = action.payload.message;
      }
    });

    builder.addCase(searchEmployeeByName.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = action.payload.response.data.message;
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export default employeeSlice.reducer;
