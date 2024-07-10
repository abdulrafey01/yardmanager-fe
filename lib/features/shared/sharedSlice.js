import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "",
  showSideBar: false,
  showActionMenu: false,
  showModal: false,
  selectedItem: -1,
  showSideMenu: {
    value: false,
    mode: "add",
  },
  showSuccessModal: false,
  showToast: {
    value: false,
    msg: "",
  },
  // pageNumber: 1,
  // totalDataLength: 0,
};

export const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setShowSideBar: (state, action) => {
      state.showSideBar = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    setShowSideMenu: (state, action) => {
      state.showSideMenu = action.payload;
    },
    setShowActionMenu: (state, action) => {
      state.showActionMenu = action.payload;
    },
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
    setShowToast: (state, action) => {
      state.showToast = action.payload;
    },
    // setPageNumber: (state, action) => {
    //   state.pageNumber = action.payload;
    // },
    // setTotalDataLength: (state, action) => {
    //   state.totalDataLength = action.payload;
    // },
  },
});

export const {
  setCurrentPage,
  setShowSideBar,
  setSelectedItem,
  setShowDeleteModal,
  setShowSideMenu,
  setShowActionMenu,
  setShowSuccessModal,
  setShowToast,
  // setPageNumber,
  // setTotalDataLength,
} = sharedSlice.actions;
export default sharedSlice.reducer;
