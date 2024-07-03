"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../../abstracts/GreenBtn";
import SearchIcon from "../../../assets/main/30-search.svg";
import MenuIcon from "../../../assets/main/37-menu.svg";
import { displayData } from "../../../helpers/pagination";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import "../../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
} from "../../../../lib/features/shared/sharedSlice";
import UploadIcon from "../../../assets/main/44-upload.svg";

import XIcon from "../../../assets/main/45-xclose.svg";

import EnlargeIcon from "../../../assets/main/46-enlarge.svg";

const page = () => {
  const dataFromServer = useSelector((state) => state.vehicle.vehicleData);

  const [imgArray, setImgArray] = React.useState(null);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [showDecodeMenu, setShowDecodeMenu] = React.useState(false);

  const [dataToShow, setDataToShow] = React.useState([]);

  const [showActionMenu, setShowActionMenu] = React.useState(-1);

  useEffect(() => {
    dispatch(setCurrentPage("Vehicle"));
    let { dataToShow, totalPage } = displayData(dataFromServer, pageNumber);
    setDataToShow(dataToShow);
    setTotalPage(totalPage);
  }, [dispatch, dataFromServer, pageNumber]);

  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div className="flex flex-col items-start  bg-white border-gray-300 rounded-xl border w-full p-4 space-y-2">
        <p className="font-semibold text-lg">Add inventory using VIN</p>
        <p className="text-base text-gray-500">
          Create inventory by entering the vehicles VIN{" "}
        </p>
        <div className="flex w-full space-x-2 sm:space-x-4">
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Enter VIN Number"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <GreenBtn
            onClick={() => setShowDecodeMenu(!showDecodeMenu)}
            title={"Decode"}
          />
        </div>
        <div
          className={`${
            showDecodeMenu ? "flex" : "hidden"
          } flex flex-col space-y-4 w-full `}
        >
          <p className="text-lg font-semibold">Vehicle Information</p>
          <div className="flex  justify-between space-x-4">
            <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <input
                type="text"
                placeholder="Year"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <input
                type="text"
                placeholder="Make"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <input
                type="text"
                placeholder="Mode"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <input
                type="text"
                placeholder="Color"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
          {/* Vehicle Image input */}
          <div className="w-full p-4 hover:border-gray-400 rounded-lg border   flex justify-center items-center border-[#D0D5DD]">
            {imgArray?.length > 0 ? (
              <div className="w-full flex justify-start items-center min-h-20 space-x-2">
                {imgArray.map((img, index) => (
                  <div className="relative ">
                    <Image
                      src={URL.createObjectURL(img)}
                      width={80}
                      height={80}
                      alt="img"
                    />
                    <div className="absolute top-[-15px] right-[-15px] cursor-pointer">
                      <Image
                        onClick={() => {
                          setImgArray(imgArray.filter((item) => item !== img));
                        }}
                        src={XIcon}
                        alt="XIcon"
                      />
                    </div>
                    <div className="absolute top-0 left-0 cursor-pointer">
                      <Image src={EnlargeIcon} alt="EnlargeIcon" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <label
                className="flex flex-col justify-center items-center cursor-pointer  space-y-2 min-h-20 "
                htmlFor="dropzone"
              >
                <Image src={UploadIcon} alt="UploadIcon" />
                <p className="text-[#01E268]">Upload Part Image</p>{" "}
                <input
                  onChange={(e) => {
                    // console.log(e.target.files[0]);

                    setImgArray(Array.from(e.target.files));
                    console.log(imgArray);
                  }}
                  id="dropzone"
                  className="hidden"
                  type="file"
                  multiple
                />
              </label>
            )}
          </div>
        </div>
      </div>
      {/* Table */}
      <div className=" border rounded-xl border-gray-300 flex flex-col">
        {/* Table Title container */}
        <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
          <p className="hidden sm:block font-bold text-lg md:text-2xl">
            Parts List
          </p>
          <p className="sm:hidden font-bold text-lg md:text-2xl text-center">
            Parts List
          </p>
          {/* Search and filter input container */}
          <div className="flex  space-x-2 sm:space-x-4">
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
              "SKU",
              "Part",
              "Year",
              "Model",
              "Make",
              "Variant",
              "Notes",
              "Location",
            ]}
          />
          {/* Body */}
          {dataToShow.map((data, index) => (
            <TableRow
              titles={[
                data.sku,
                data.part,
                data.year,
                data.model,
                data.make,
                data.variant,
                data.notes,
                data.location,
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
