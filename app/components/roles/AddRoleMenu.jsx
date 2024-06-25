import React from "react";
import DownArrowIcon from "../../assets/main/39-downarrow.svg";
import Image from "next/image";
import GreenToggle from "../common/GreenToggle";
import PermissionMenu from "../common/PermissionMenu";
import GreenBtn from "../../abstracts/GreenBtn";
import { setShowAddRoleMenu } from "../../../lib/features/roles/roleSlice";
import { useDispatch, useSelector } from "react-redux";
const AddRoleMenu = () => {
  const { showAddRoleMenu } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  return (
    <div
      className={`absolute ${
        showAddRoleMenu ? "flex" : "hidden"
      } w-full  h-full  z-20`}
    >
      {/* Black part */}
      <div
        onClick={() => {
          dispatch(setShowAddRoleMenu(false));
          console.log("clicked");
        }}
        className="flex-[1] lg:flex-[2] hidden sm:block bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div className="flex-1 bg-white  flex flex-col justify-start items-start ">
        <div className="p-6 flex flex-col space-y-4">
          <p className="font-semibold">Add New Role</p>
          {/* Role name input */}
          <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Role Name"
            />
          </div>
          <p className=" font-semibold">Permissions</p>
          <p className=" ">
            Assign permissions to the role you are creating and manage your
            employees effectively
          </p>
        </div>
        {/* Toggle Line */}
        <PermissionMenu title={"Roles & Permissions"} />
        <PermissionMenu title={"Employees"} />
        <PermissionMenu title={"Invoices"} />
        <PermissionMenu title={"Inventory"} />
        <PermissionMenu title={"Settings"} />
        <PermissionMenu title={"Location"} />
        <PermissionMenu title={"Recycled Items"} />
        {/* Buttons */}
        <div className="flex p-6 flex-1 w-full justify-center space-x-4 place-items-end">
          <div
            onClick={() => {
              dispatch(setShowAddRoleMenu(false));
            }}
            className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-white border border-gray-300 font-semibold cursor-pointer select-none hover:bg-gray-200"
          >
            Cancel
          </div>
          <div className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none">
            Add Role
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoleMenu;
