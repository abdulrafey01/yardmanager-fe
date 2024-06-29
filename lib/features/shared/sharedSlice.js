import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "roles",
  showActionMenu: false,
  showModal: false,
  deleteIndex: -1,
  showSideMenu: {
    value: false,
    mode: "add",
  },
  showSuccessModal: false,
};

export const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDeleteIndex: (state, action) => {
      state.deleteIndex = action.payload;
    },
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    setShowSideMenu: (state, action) => {
      state.showSideMenu = action.payload;
    },
    setShowSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setDeleteIndex,
  setShowDeleteModal,
  setShowSideMenu,
  setShowSuccessModal,
} = sharedSlice.actions;
export default sharedSlice.reducer;
