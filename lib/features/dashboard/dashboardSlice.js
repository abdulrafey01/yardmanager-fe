const { createSlice } = require("@reduxjs/toolkit");
const {
  fetchCounts,
  fetchInventoryCounts,
  fetchPartCounts,
} = require("./dashboardActions");

const initialState = {
  toastMsg: null,
  error: null,
  counts: null,
  inventoryGraphData: null,
  partsGraphData: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetState: (state) => {
      state.counts = null;
      state.error = null;
      state.inventoryGraphData = null;
      state.partsGraphData = null;
      state.toastMsg = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch counts
    builder.addCase(fetchCounts.fulfilled, (state, action) => {
      state.counts = action.payload;
      state.toastMsg = "Fetched Analytics Successfully";
    });

    builder.addCase(fetchCounts.rejected, (state, action) => {
      state.error = action.payload;
      // state.toastMsg = "Error loading data";
    });

    // Fetch inventory graph data
    builder.addCase(fetchInventoryCounts.fulfilled, (state, action) => {
      state.inventoryGraphData = action.payload;
    });

    builder.addCase(fetchInventoryCounts.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Fetch part graph data
    builder.addCase(fetchPartCounts.fulfilled, (state, action) => {
      state.partsGraphData = action.payload;
    });

    builder.addCase(fetchPartCounts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { resetState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
