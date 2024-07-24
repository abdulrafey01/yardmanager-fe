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
import {
  fetchPartsByPage,
  searchPartByName,
} from "../../../../lib/features/parts/partActions";
import Footer from "../../../components/common/Footer";
import { resetPartToast } from "../../../../lib/features/parts/partSlice";

const page = () => {
  const { error, partData, toastMsg, totalDataLength, partSearchData } =
    useSelector((state) => state.parts);

  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState(null);

  const [searchInputValue, setSearchInputValue] = React.useState("");

  const [dataLimit, setDataLimit] = React.useState(10);
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
          (privilege) => privilege.name === "parts"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);
  useEffect(() => {
    dispatch(setCurrentPage("Parts"));
    dispatch(fetchPartsByPage({ page: pageNumber, limit: dataLimit }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When part data has come, set total pages
  }, [error]);

  useEffect(() => {
    if (partData) {
      setDataFromServer(partData);
      let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      setTotalPage(totalPage);
    }
  }, [partData, dataLimit]);

  useEffect(() => {
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, ...toastMsg }));
        dispatch(resetPartToast());
      }
    }
  }, [toastMsg]);
  // Search function
  const handleSearch = (e) => {
    setSearchInputValue(e.target.value);
    dispatch(fetchPartsByPage({ search: e.target.value }));
  };

  const handleRadioClick = (e) => {
    if (e.target.value == 20) {
      dispatch(fetchPartsByPage({ page: 1, limit: 20 }));
      setDataLimit(20);
      setPageNumber(1);
    } else if (e.target.value == 30) {
      dispatch(fetchPartsByPage({ page: 1, limit: 30 }));
      setDataLimit(30);
      setPageNumber(1);
    } else {
      dispatch(fetchPartsByPage({ page: 1, limit: 10 }));
      setDataLimit(10);
      setPageNumber(1);
    }
    setSearchInputValue("");
  };
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        <div className="flex items-center justify-end space-x-4  w-full p-2">
          {/* Add Part Button */}
          <GreenBtn
            onClick={() =>
              dispatch(setShowSideMenu({ value: true, mode: "add" }))
            }
            title={"Add New Part"}
          />
        </div>
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-4 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              List of Parts
            </p>
            <p className="sm:hidden font-bold text-lg md:text-2xl">Parts</p>
            {/* Search input */}
            <div className="flex  space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInputValue}
                  className="w-full outline-none bg-transparent"
                  onChange={handleSearch}
                />
              </div>
              {/* <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
                <p>Filter</p>
                <Image src={MenuIcon} alt="MenuIcon" />
              </div> */}
            </div>
          </div>
          {/* Table Container */}
          <div className=" overflow-y-visible ">
            {/* Head */}
            <TableHead titles={["Name", "Variants"]} />
            {/* Body */}
            {dataFromServer.length == 0 && (
              <div className="text-center p-8 font-semibold">
                No Data Available
              </div>
            )}
            {dataFromServer.map((data, index) => (
              <TableRow
                titles={[data.name, data.variant]}
                key={index}
                rowIndex={index}
                item={data}
                permissions={pagePermission}
              />
            ))}
          </div>
          {/* Footer */}
          <Footer
            totalPage={totalPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleRadioClick={handleRadioClick}
          />
        </div>
      </div>
    )
  );
};

export default page;
