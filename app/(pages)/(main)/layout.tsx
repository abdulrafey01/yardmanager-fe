"use client";
import React from "react";
import SideBar from "../../components/common/SideBar";
import TopBar from "@/app/components/common/TopBar";

import { Provider } from "react-redux";
import { makeStore } from "../../../lib/store";
import DeleteModal from "@/app/components/common/DeleteModal";
type Props = {};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
