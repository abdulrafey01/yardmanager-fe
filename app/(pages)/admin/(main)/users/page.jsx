"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GreenBtn from "../../../../abstracts/GreenBtn";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../../lib/features/shared/sharedSlice";

import SearchIcon from "../../../../assets/main/30-search.svg";
import TableHead from "../../../../components/common/TableHead";
import TableRow from "../../../../components/common/TableRow";
import { calcTotalPage } from "../../../../helpers/pagination";
import Image from "next/image";
import { fetchLocationsByPage } from "../../../../../lib/features/locations/locationActions";

import MenuIcon from "../../../../assets/main/37-menu.svg";
const page = () => {
  const { error, locationData, toastMsg, totalDataLength, locationSearchData } =
    useSelector((state) => state.locations);

  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);
  const dispatch = useDispatch();
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  useEffect(() => {
    dispatch(setCurrentPage("Users"));
    dispatch(fetchLocationsByPage({ page: pageNumber }));
  }, [dispatch, pageNumber]);

  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "admin") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When location data has come set total pages
    if (locationData) {
      setDataFromServer(locationData);
      let { totalPage } = calcTotalPage(totalDataLength);
      setTotalPage(totalPage);
      console.log(locationData);
    }
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, ...toastMsg }));
      }
    }
  }, [error, locationData, toastMsg]);

  // Search function
  const handleSearch = (e) => {
    dispatch(fetchLocationsByPage({ search: e.target.value }));
  };

  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div className="flex items-center justify-end space-x-4  w-full p-2">
        {/* Add User Button */}
        <GreenBtn
          increaseWidth={true}
          title={"Add New User"}
          onClick={() => {
            dispatch(setShowSideMenu({ value: true, mode: "add" }));
          }}
        />
      </div>

      {/* Table */}
      <div className=" border rounded-xl border-gray-300 flex flex-col">
        {/* Table Title container */}
        <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
          <p className="hidden sm:block font-bold text-lg md:text-2xl">
            Users List
          </p>
          <p className="sm:hidden font-bold text-lg md:text-2xl">Users</p>
          {/* Search and filter input container */}
          <div className="flex space-x-2 sm:space-x-4">
            <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <Image src={SearchIcon} alt="SearchIcon" />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none bg-transparent"
                //   onChange={handleSearch}
              />
            </div>
            <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
              <p>Filter</p>
              <Image src={MenuIcon} alt="MenuIcon" />
            </div>
          </div>
        </div>
        {/* Table Container */}
        <div className=" overflow-x-auto sm:overflow-visible">
          {/* Head */}
          <TableHead titles={["Sr.#", "Username", "Email", "Role", "Date"]} />
          {/* Body */}
          <TableRow
            titles={["1", "Ali", "Hello@gmail", "Admin", "12/5/2022"]}
          />
          {dataFromServer.map((data, index) => (
            <TableRow
              titles={[data.location]}
              key={index}
              rowIndex={index}
              item={data}
              permissions={pagePermission}
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
