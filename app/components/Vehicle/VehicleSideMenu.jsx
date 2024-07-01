import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import UploadIcon from "../../assets/main/44-upload.svg";

import {
  setShowSideMenu,
  setShowSuccessModal,
} from "../../../lib/features/shared/sharedSlice";
import XIcon from "../../assets/main/45-xclose.svg";

import EnlargeIcon from "../../assets/main/46-enlarge.svg";
import React from "react";
const VehicleSideMenu = () => {
  const { showSideMenu, currentPage } = useSelector((state) => state.shared);

  const [imgArray, setImgArray] = React.useState(null);
  const dispatch = useDispatch();
  return (
    <div
      className={`absolute flex w-full ${
        showSideMenu.value ? "flex" : "hidden"
      }   h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={() => {
          dispatch(setShowSideMenu({ value: false }));
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
            {showSideMenu.mode === "edit" ? "Edit Vehicle " : "Add New Vehicle"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Vehicle name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Vehicle Name"
              />
            </div>
            {/* Vehicle Location input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Location"
              />
            </div>

            {/* Vehicle Dates input */}
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
            {/* Vehicle Model input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Model"
              />
            </div>
            {/* Vehicle Make input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Make"
              />
            </div>

            {/* Vehicle Variant input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Variant"
              />
            </div>
            {/* Vehicle Price input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Price"
              />
            </div>
            {/* Vehicle Notes input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <textarea
                className="w-full outline-none min-h-20 max-h-32"
                type="text"
                placeholder="Notes"
              />
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
              dispatch(setShowSideMenu({ value: false, mode: "add" }));
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
            Add Vehicle
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSideMenu;
