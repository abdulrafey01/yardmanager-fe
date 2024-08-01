import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSideMenu,
  setShowSuccessModal,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import {
  addLocation,
  updateLocation,
} from "../../../lib/features/locations/locationActions";

const LocationSideMenu = () => {
  const dispatch = useDispatch();

  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { toastMsg } = useSelector((state) => state.locations);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    location: "",
  });

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        setFormData({ location: selectedItem.location });
      }
    } else {
      setFormData({ location: "" });
    }
  }, [selectedItem, showSideMenu]);

  //  Function to handle input change
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submit
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (formData.location.length < 5) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter atleast 5 characters",
          red: true,
        })
      );
    }
    if (showSideMenu.mode === "edit") {
      dispatch(
        updateLocation({
          formData,
          id: selectedItem._id,
          isAdmin: user?.userType === "admin",
        })
      );
    } else {
      dispatch(
        addLocation({ data: formData, isAdmin: user?.userType === "admin" })
      );
    }
  };

  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(setShowSideMenu({ value: false }));
    }
  }, [toastMsg]);

  return (
    <div
      className={`fixed ${
        showSideMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip `}
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
            {showSideMenu.mode === "edit"
              ? "Edit Location"
              : showSideMenu.mode === "preview"
              ? "Preview Location"
              : "Add New Location"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Location name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                onChange={onInputChange}
                name="location"
                className="w-full outline-none"
                type="text"
                placeholder="Location Name"
                value={formData.location}
              />
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
            onClick={onFormSubmit}
            className={`flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none ${
              showSideMenu.mode === "preview" && "hidden"
            }`}
          >
            {showSideMenu.mode === "edit" ? "Edit Location" : "Add Location"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSideMenu;
