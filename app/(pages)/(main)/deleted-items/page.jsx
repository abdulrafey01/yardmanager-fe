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
import { fetchDeletedItemsByPage } from "../../../../lib/features/deleted-items/deletedItemsActions";

const page = () => {
  const { error, deletedItemsData, toastMsg, totalDataLength } = useSelector(
    (state) => state.deletedItems
  );
  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);
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
          (privilege) => privilege.name === "recycled"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState([]);

  useEffect(() => {
    dispatch(setCurrentPage("DeletedItems"));
    dispatch(fetchDeletedItemsByPage({ page: pageNumber }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When deleted data has come, set total pages
    if (deletedItemsData) {
      setDataFromServer(deletedItemsData);
      let { totalPage } = calcTotalPage(totalDataLength);
      setTotalPage(totalPage);
    }
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, msg: toastMsg }));
      }
    }
  }, [error, deletedItemsData, toastMsg]);

  // Search function
  const handleSearch = (e) => {
    dispatch(fetchDeletedItemsByPage({ search: e.target.value }));
  };

  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-2 sm:p-4 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Deleted Items
            </p>
            <p className="sm:hidden text-center font-bold text-xs md:text-2xl px-1">
              Deleted Items
            </p>
            {/* Search input */}
            <div className="flex  space-x-1 sm:space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent"
                  onChange={handleSearch}
                />
              </div>
              {/* Filter Button */}
              <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center  sm:space-x-3">
                <p>Filter</p>
                <Image src={MenuIcon} alt="MenuIcon" />
              </div>
              <div className="p-1 sm:p-3 cursor-pointer hover:bg-red-700 border bg-[#D32F2F] text-white border-gray-300 rounded-lg flex justify-between items-center text-xs sm:text-sm text-center">
                <p>Clear All</p>
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className=" overflow-x-auto sm:overflow-visible">
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
                  `${new Date(data.startYear).getFullYear()} - ${new Date(
                    data.lastYear
                  ).getFullYear()}`,
                  data.model,
                  data.make,
                  data.variant,
                ]}
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
