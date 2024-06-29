"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import SearchIcon from "../../../assets/main/30-search.svg";
import MenuIcon from "../../../assets/main/37-menu.svg";
import { displayData } from "../../../helpers/pagination";

import PlusIcon from "../../../assets/main/29-plus.svg";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import "../../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
} from "../../../../lib/features/shared/sharedSlice";

const page = () => {
  const dataFromServer = useSelector((state) => state.invoice.data);

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const [dataToShow, setDataToShow] = React.useState([]);

  const [showActionMenu, setShowActionMenu] = React.useState(-1);

  useEffect(() => {
    dispatch(setCurrentPage("Invoices"));
    let { dataToShow, totalPage } = displayData(dataFromServer, pageNumber);
    setDataToShow(dataToShow);
    setTotalPage(totalPage);
  }, [dataFromServer, pageNumber]);

  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div className="flex items-center justify-between  w-full p-2">
        <p className="font-bold text-lg">Manage Invoices</p>
        {/* Create Button */}
        <div className="cursor-pointer bg-[#78FFB6] hover:bg-[#37fd93] p-3 text-left rounded-lg flex space-x-2">
          <p className="font-bold text-sm">Create Invoice</p>
          <Image src={PlusIcon} alt="arrowIcon" />
        </div>
      </div>
      {/* Table */}
      <div className=" border rounded-xl border-gray-300 flex flex-col">
        {/* Table Title container */}
        <div className="p-4 w-full rounded-t-lg flex justify-between items-center">
          <p className="hidden sm:block font-bold text-lg md:text-2xl">
            Invoices List
          </p>
          <p className="sm:hidden font-bold text-lg md:text-2xl">Invoices</p>
          {/* Search input */}
          <div className="flex  space-x-4">
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
        <div className=" overflow-auto overflow-y-visible">
          {/* Head */}
          <TableHead
            titles={[
              "Name",
              "ID",
              "Email",
              "Phone",
              "Amount",
              "Date",
              "Status",
            ]}
          />
          {/* Body */}
          {dataToShow.map((data, index) => (
            <TableRow
              titles={[
                data.name,
                data.id,
                data.email,
                data.phone,
                data.amount,
                data.date,
                data.status,
              ]}
              key={index}
              showMenu={showActionMenu}
              setShowMenu={setShowActionMenu}
              rowIndex={index}
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
