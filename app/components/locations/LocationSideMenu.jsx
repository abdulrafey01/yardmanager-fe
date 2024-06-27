import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLocationSideMenu } from "../../../lib/features/locations/locationSlice";
const LocationSideMenu = () => {
  const { showLocationSideMenu } = useSelector((state) => state.locations);
  const dispatch = useDispatch();
  return (
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

export default LocationSideMenu;
