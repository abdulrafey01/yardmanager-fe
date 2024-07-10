"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../../abstracts/GreenBtn";
import SearchIcon from "../../../assets/main/30-search.svg";
import MenuIcon from "../../../assets/main/37-menu.svg";
import { calcTotalPage, displayData } from "../../../helpers/pagination";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import "../../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../lib/features/shared/sharedSlice";

import WhiteBtn from "../../../abstracts/WhiteBtn";
import {
  fetchRolesByPage,
  searchRoleByName,
} from "../../../../lib/features/roles/roleActions";
import {
  resetState,
  setShowEmployeeSideMenu,
} from "../../../../lib/features/roles/roleSlice";

const page = () => {
  const { error, rolesData, toastMsg, totalDataLength, roleSearchData } =
    useSelector((state) => state.roles);

  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState([]);
  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "user") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
      setPagePermission(
        user.data.role.privileges.find(
          (privilege) => privilege.name === "roles"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);
  useEffect(() => {
    dispatch(setCurrentPage("Roles"));
    dispatch(fetchRolesByPage({ page: pageNumber }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When role data has come, set total pages
    if (rolesData) {
      setDataFromServer(rolesData);
      let { totalPage } = calcTotalPage(totalDataLength);
      setTotalPage(totalPage);
      console.log(rolesData);
    }
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, msg: toastMsg }));
      }
    }
  }, [error, rolesData, toastMsg]);

  // Search function
  const handleSearch = (e) => {
    dispatch(fetchRolesByPage({ search: e.target.value }));
  };
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        <div className="flex items-center justify-end space-x-4  w-full p-2">
          {/* Create Role Button */}
          {pagePermission?.write && (
            <>
              <WhiteBtn
                onClick={() => dispatch(setShowEmployeeSideMenu(true))}
                title={"Add Employee"}
              />
              <GreenBtn
                onClick={() =>
                  dispatch(setShowSideMenu({ value: true, mode: "add" }))
                }
                title={"Create New Role"}
              />
            </>
          )}
        </div>
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-4 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Roles & Permission List
            </p>
            <p className="sm:hidden font-bold text-lg md:text-2xl">Roles</p>
            {/* Search input */}
            <div className="flex  space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent"
                  onChange={handleSearch}
                />
              </div>
              <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
                <p>Filter</p>
                <Image src={MenuIcon} alt="MenuIcon" />
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className=" overflow-y-visible ">
            {/* Head */}
            <TableHead titles={["Sr #", "Role Name"]} />
            {/* Body */}
            {dataFromServer.map((data, index) => (
              <TableRow
                titles={[index + 1, data.name]}
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
    )
  );
};

export default page;
