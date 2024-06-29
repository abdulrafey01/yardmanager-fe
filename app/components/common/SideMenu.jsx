"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setShowLocationSideMenu } from "../../../lib/features/locations/locationSlice";
import { setShowPartSideMenu } from "../../../lib/features/parts/partSlice";
import { setShowInventorySideMenu } from "../../../lib/features/inventory/inventorySlice";
import { setShowSuccessModal } from "../../../lib/features/locations/locationSlice";
import Image from "next/image";
import UploadIcon from "../../assets/main/44-upload.svg";
import XIcon from "../../assets/main/45-xclose.svg";
import EnlargeIcon from "../../assets/main/46-enlarge.svg";
const SideMenu = () => {
  const { showLocationSideMenu } = useSelector((state) => state.locations);
  const { showPartSideMenu } = useSelector((state) => state.parts);
  const { showInventorySideMenu } = useSelector((state) => state.inventory);
  const [imgArray, setImgArray] = React.useState(null);

  const dispatch = useDispatch();

  const renderPartSideMenu = () => {
    return (
      <div
        className={`absolute ${
          showPartSideMenu.value ? "flex" : "hidden"
        } w-full  h-full  z-20 overflow-y-clip `}
      >
        {/* Black part */}
        <div
          onClick={() => {
            dispatch(setShowPartSideMenu({ value: false }));
            console.log("clicked");
          }}
          className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
        ></div>

        {/* Main container */}
        <div
          // ref={menuRef}
          className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start "
        >
          <div className="p-6 flex w-full flex-col space-y-4">
            <p className="font-semibold">
              {showPartSideMenu.mode === "edit" ? "Edit Part" : "Add New Part"}
            </p>
            {/* Part name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Part Name"
              />
            </div>
            {/* Part Variant input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Variant"
              />
            </div>
          </div>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showPartSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col  items-center w-full `}
          ></div>

          {/* Buttons */}

          <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
            <div
              onClick={() => {
                dispatch(setShowPartSideMenu({ value: false, mode: "add" }));
              }}
              className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-white border border-gray-300 font-semibold cursor-pointer select-none hover:bg-gray-200"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                dispatch(setShowSuccessModal(true));
              }}
              className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none"
            >
              Add Part
            </div>
          </div>
        </div>
      </div>
    );
  };
  // Inventory Side Menu
  const renderInventorySideMenu = () => {
    return (
      <div className={`absolute flex w-full  h-full  z-20 overflow-y-clip `}>
        {/* Black part */}
        <div
          onClick={() => {
            dispatch(setShowInventorySideMenu({ value: false }));
            console.log("clicked");
          }}
          className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
        ></div>

        {/* Main container */}
        <div
          // ref={menuRef}
          className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start "
        >
          <div className="p-6 flex w-full flex-col space-y-4">
            <p className="font-semibold">
              {showInventorySideMenu.mode === "edit"
                ? "Edit Inventory"
                : "Add New Inventory"}
            </p>
            {/* This additional container to make them opaque in preview mode */}
            <div
              className={`${
                showInventorySideMenu.mode === "preview" &&
                "opacity-50 pointer-events-none"
              }  flex flex-col space-y-4  items-center w-full `}
            >
              {/* Inventory name input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Inventory Name"
                />
              </div>
              {/* Inventory Location input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Location"
                />
              </div>

              {/* Inventory Dates input */}
              <div className="flex space-x-4">
                <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                  <input
                    className="w-full outline-none"
                    type="text"
                    placeholder="Start Date"
                  />
                </div>
                <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                  <input
                    className="w-full outline-none"
                    type="text"
                    placeholder="End Date"
                  />
                </div>
              </div>
              {/* Inventory Model input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Model"
                />
              </div>
              {/* Inventory Make input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Make"
                />
              </div>

              {/* Inventory Variant input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Variant"
                />
              </div>
              {/* Inventory Price input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Price"
                />
              </div>
              {/* Inventory Notes input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <textarea
                  className="w-full outline-none min-h-20 max-h-32"
                  type="text"
                  placeholder="Notes"
                />
              </div>
              {/* Inventory Image input */}
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
                              setImgArray(
                                imgArray.filter((item) => item !== img)
                              );
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
          {/* Buttons */}

          <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
            <div
              onClick={() => {
                dispatch(
                  setShowInventorySideMenu({ value: false, mode: "add" })
                );
              }}
              className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-white border border-gray-300 font-semibold cursor-pointer select-none hover:bg-gray-200"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                dispatch(setShowSuccessModal(true));
              }}
              className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none"
            >
              Add Inventory
            </div>
          </div>
        </div>
      </div>
    );
  };

  return showPartSideMenu.value ? (
    renderPartSideMenu()
  ) : showInventorySideMenu.value ? (
    renderInventorySideMenu()
  ) : (
    <div
      className={`absolute ${
        showLocationSideMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={() => {
          dispatch(setShowLocationSideMenu({ value: false }));
          console.log("clicked");
        }}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div
        // ref={menuRef}
        className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start "
      >
        <div className="p-6 flex w-full flex-col space-y-4">
          <p className="font-semibold">
            {showLocationSideMenu.mode === "edit"
              ? "Edit Location"
              : "Add New Location"}
          </p>
          {/* Location name input */}
          <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Location Name"
            />
          </div>
        </div>
        {/* This additional container to make them opaque in preview mode */}
        <div
          className={`${
            showLocationSideMenu.mode === "preview" &&
            "opacity-50 pointer-events-none"
          }  flex flex-col  items-center w-full `}
        ></div>

        {/* Buttons */}

        <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
          <div
            onClick={() => {
              dispatch(setShowLocationSideMenu({ value: false, mode: "add" }));
            }}
            className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-white border border-gray-300 font-semibold cursor-pointer select-none hover:bg-gray-200"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              dispatch(setShowLocationSideMenu(true));
            }}
            className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none"
          >
            Add Location
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
