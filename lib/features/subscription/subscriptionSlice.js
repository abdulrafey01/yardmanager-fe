import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSubscriptionsByPage,
  addSubscription,
  deleteSubscription,
  updateSubscription,
  searchSubscriptionByName,
} from "./subscriptionActions";

const initialState = {
  subscriptionData: [],
  subscriptionSearchData: [],
  toastMsg: null,
  error: null, // this state is just for debugging
  totalDataLength: 0,
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    deleteSubscription: (state, action) => {
      state.subscriptionData.splice(action.payload, 1);
      state.showDeleteSubscriptionModal = true;
    },
    resetSubscriptionToast: (state) => {
      state.toastMsg = null;
    },
    resetSubscriptionSearchData: (state) => {
      state.subscriptionSearchData = [];
    },
  },

  extraReducers: (builder) => {
    // Fetching subscriptions by page
    builder.addCase(fetchSubscriptionsByPage.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.subscriptionData = action.payload.data;
        state.totalDataLength = action.payload.meta.total;
        // state.toastMsg = { msg:action.payload.message, red: false }
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(fetchSubscriptionsByPage.rejected, (state, action) => {
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

    // Add Subscription
    builder.addCase(addSubscription.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.subscriptionData.unshift(action.payload.data);
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(addSubscription.rejected, (state, action) => {
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

    // Delete Subscription
    builder.addCase(deleteSubscription.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.subscriptionData = state.subscriptionData.filter(
          (subscription) => subscription._id !== action.payload.data._id
        );
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(deleteSubscription.rejected, (state, action) => {
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

    // Update subscription
    builder.addCase(updateSubscription.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.subscriptionData = state.subscriptionData.map((subscription) => {
          if (subscription._id === action.payload.data._id) {
            return action.payload.data;
          }
          return subscription;
        });
        state.toastMsg = { msg: action.payload.message, red: false };
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });
    builder.addCase(updateSubscription.rejected, (state, action) => {
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

    // Search subscription by name
    builder.addCase(searchSubscriptionByName.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.subscriptionSearchData = action.payload.data;
      } else {
        state.toastMsg = { msg: action.payload.message, red: true };
      }
    });

    builder.addCase(searchSubscriptionByName.rejected, (state, action) => {
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

export const { resetSubscriptionToast, resetSubscriptionSearchData } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
