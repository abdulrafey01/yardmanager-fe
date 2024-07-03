import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import {
  setShowSideMenu,
  setShowSuccessModal,
} from "../../../lib/features/shared/sharedSlice";
import React from "react";
import MainInput from "../common/MainInput";
import PWDIcon from "../../assets/auth/2-AdornmentEnd.svg";
const InventorySideMenu = () => {
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
            {showSideMenu.mode === "edit" ? "Edit Employee" : "Add  Employee"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Employee Name input */}
            <div className="flex space-x-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            {/* Employee Email input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Email Address"
              />
            </div>

            {/* Inventory Dates input */}
            <div className="flex space-x-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Select Role"
                />
              </div>
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Position"
                />
              </div>
            </div>
            {/* Employee date hired input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Date Hired"
              />
            </div>
            {/* Employee password input */}

            <div className="w-full ">
              <MainInput placeholder="Password" icon={PWDIcon} />
            </div>

            {/* Confirm password input */}
            <div className="w-full ">
              <MainInput placeholder="Confirm Password" icon={PWDIcon} />
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
            Send Invite
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySideMenu;
