"use client";
import React, { useEffect, useRef } from "react";
import PermissionMenu from "../common/PermissionMenu";
import {
  setShowSideRoleMenu,
  setShowSuccessModal,
} from "../../../lib/features/roles/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../../app/styles.css";
const AddRoleMenu = () => {
  const { showSideRoleMenu, showSuccessModal } = useSelector(
    (state) => state.roles
  );
  const dispatch = useDispatch();
  const menuRef = useRef();

  useEffect(() => {
    if (showSideRoleMenu.value && menuRef.current) {
      menuRef.current.scrollTop = 0;
    }
    // Set scroll top position when opened and when role added so that modal can be viewed
  }, [showSideRoleMenu]);
  return (
    <div
      className={`absolute ${
        showSideRoleMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={() => {
          dispatch(setShowSideRoleMenu({ value: false }));
          console.log("clicked");
        }}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div
        ref={menuRef}
        className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start "
      >
        <div className="p-6 flex flex-col space-y-4">
          <p className="font-semibold">
            {showSideRoleMenu.mode === "edit" ? "Edit Role" : "Add New Role"}
          </p>
          {/* Role name input */}
          <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Role Name"
            />
          </div>
          <div
            className={`w-full flex flex-col space-y-4 ${
              showSideRoleMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }`}
          >
            <p className=" font-semibold">Permissions</p>
            <p className=" ">
              {showSideRoleMenu.mode === "edit"
                ? "Edit permissions to the role you are creating and manage your users effectively!"
                : "Assign permissions to the role you are creating and manage your           employees effectively!"}
            </p>
          </div>
        </div>
        {/* This additional container to make them opaque in preview mode */}
        <div
          className={`${
            showSideRoleMenu.mode === "preview" &&
            "opacity-50 pointer-events-none"
          }  flex flex-col  items-center w-full `}
        >
          {/* Toggle Line */}
          <PermissionMenu title={"Roles & Permissions"} />
          <PermissionMenu title={"Employees"} />
          <PermissionMenu title={"Invoices"} />
          <PermissionMenu title={"Inventory"} />
          <PermissionMenu title={"Settings"} />
          <PermissionMenu title={"Location"} />
          <PermissionMenu title={"Recycled Items"} />
        </div>

        {/* Buttons */}

        <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
          <div
            onClick={() => {
              dispatch(setShowSideRoleMenu({ value: false, mode: "add" }));
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
            Add Role
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoleMenu;
