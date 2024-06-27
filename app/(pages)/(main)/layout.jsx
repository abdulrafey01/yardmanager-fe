"use client";
import React from "react";
import SideBar from "../../components/common/SideBar";

import { Provider } from "react-redux";
import { makeStore } from "../../../lib/store";
import AbsoluteMenusAndModals from "../../components/common/AbsoluteMenusAndModals";
import TopBar from "../../components/common/TopBar";
import "../../styles.css";

const layout = ({ children }) => {
  return (
    <Provider store={makeStore()}>
      <div className="flex relative  min-h-screen no-scrollbar">
        <AbsoluteMenusAndModals />
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
