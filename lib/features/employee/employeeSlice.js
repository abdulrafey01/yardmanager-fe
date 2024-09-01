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
  reducers: {
    resetEmpToast: (state) => {
      state.toastMsg = null;
    },
  },
  extraReducers: (builder) => {
    // Fethcing all employees
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      // If success
      if (action.payload.success) {
        state.employeeData = action.payload.data;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        // If failed
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      // if error in request i.e error from server catch block
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });

    // Fetching employees by page
    builder.addCase(fetchEmployeesByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchEmployeesByPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
    // Adding new employee
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addEmployee.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
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
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteEmployee.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
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
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(updateEmployee.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = {
          msg: "Conncetion Problem",
          red: true,
        };
      }
    });

    // Search employee by name
    builder.addCase(searchEmployeeByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.employeeSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchEmployeeByName.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.toastMsg = {
          msg: action?.payload?.response?.data?.message,
          red: true,
        };
      } else {
        state.toastMsg = "Conncetion Problem";
      }
    });
  },
});

export const { resetEmpToast } = employeeSlice.actions;

export default employeeSlice.reducer;
