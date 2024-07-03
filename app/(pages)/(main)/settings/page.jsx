"use client";
import React, { useEffect } from "react";
import GreenToggle from "../../../components/common/GreenToggle";
import { setCurrentPage } from "../../../../lib/features/shared/sharedSlice";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage("Settings"));
  }, [dispatch]);
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-4 w-screen md:w-full ">
      {/* First container */}
      <div className="w-full bg-white flex items-center justify-start  p-4 rounded-lg">
        <GreenToggle />
        <div className="flex flex-col justify-between">
          <p className="font-bold">Inventory Price</p>
          <p className="text-[#6E7793]">Require price when adding inventory</p>
        </div>
      </div>
      {/* Second container */}
      <div className="w-full bg-white flex items-center justify-start  p-4 rounded-lg">
        <GreenToggle />
        <div className="flex flex-col justify-between">
          <p className="font-bold">Part Images</p>
          <p className="text-[#6E7793]">
            Require Part images when adding inventory
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
