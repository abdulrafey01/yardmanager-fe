"use client";
import React from "react";
import SideBar from "../../components/common/SideBar";

import { Provider } from "react-redux";
import { makeStore } from "../../../lib/store";
import DeleteModal from "../../components/common/DeleteModal";
import TopBar from "../../components/common/TopBar";

const layout = ({ children }) => {
  return (
    <Provider store={makeStore()}>
      <div className="flex relative bg-[#F9FAFB] min-h-screen">
        <DeleteModal />
        <SideBar />
        <div className="flex-[5] flex flex-col">
          <TopBar />
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default layout;
