"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../../abstracts/GreenBtn";
import SearchIcon from "../../../assets/main/30-search.svg";
import MenuIcon from "../../../assets/main/37-menu.svg";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import "../../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../lib/features/shared/sharedSlice";
import { fetchInventoryByPage } from "../../../../lib/features/inventory/inventoryActions";
import { calcTotalPage } from "../../../helpers/pagination";

const page = () => {
  const { error, inventoryData, toastMsg, totalDataLength } = useSelector(
    (state) => state.inventory
  );

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState([]);

  useEffect(() => {
    dispatch(setCurrentPage("Inventory"));
    dispatch(fetchInventoryByPage(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When role data has come, set total pages
    if (inventoryData) {
      setDataFromServer(inventoryData);
      let { totalPage } = calcTotalPage(totalDataLength);
      setTotalPage(totalPage);
    }
    if (toastMsg) {
      dispatch(setShowToast({ value: true, msg: toastMsg }));
    }
  }, [error, inventoryData, toastMsg]);

  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div className="flex items-center justify-end space-x-4  w-full p-2">
        {/* Add Inventory Button */}
        <GreenBtn
          onClick={() =>
            dispatch(setShowSideMenu({ value: true, mode: "add" }))
          }
          title={"Add New Inventory"}
        />
      </div>
      {/* Table */}
      <div className=" border rounded-xl border-gray-300 flex flex-col">
        {/* Table Title container */}
        <div className="p-4 w-full rounded-t-lg flex gap-2 justify-between items-center">
          <p className="hidden sm:block font-bold text-lg md:text-2xl">
            List of Inventories
          </p>
          <p className="sm:hidden font-bold text-lg md:text-2xl">Inventory</p>
          {/* Search input */}
          <div className="flex space-x-2 sm:space-x-4">
            <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <Image src={SearchIcon} alt="SearchIcon" />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
              <p>Filter</p>
              <Image src={MenuIcon} alt="MenuIcon" />
            </div>
          </div>
        </div>
        {/* Table Container */}
        <div className="overflow-auto overflow-y-visible pb-52">
          {/* Head */}
          <TableHead
            titles={["SKU", "Part", "Year", "Model", "Make", "Variant"]}
          />
          {/* Body */}
          {dataFromServer.map((data, index) => (
            <TableRow
              titles={[
                data.sku,
                data.part?.name,
                data.lastYear,
                data.model,
                data.make,
                data.variant,
              ]}
              key={index}
              rowIndex={index}
              item={data}
            />
          ))}
        </div>
        {/* Footer */}
        <div className="p-4 w-full rounded-b-lg flex justify-between items-center">
          <p className="font-semibold text-sm">
            Page {pageNumber} of {totalPage}
          </p>
          <div className="flex space-x-2">
            <div
              onClick={() =>
                setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1)
              }
              className="cursor-pointer hover:bg-gray-300 py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg"
            >
              Previous
            </div>
            <div
              onClick={() =>
                setPageNumber(
                  pageNumber === totalPage ? pageNumber : pageNumber + 1
                )
              }
              className="cursor-pointer hover:bg-gray-300 py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg"
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
