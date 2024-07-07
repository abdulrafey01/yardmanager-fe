"use client";
import React, { useEffect, useRef, useState } from "react";
import PermissionMenu from "../common/PermissionMenu";

import { useDispatch, useSelector } from "react-redux";
import "../../../app/styles.css";
import {
  setShowSideMenu,
  setShowSuccessModal,
} from "../../../lib/features/shared/sharedSlice";
import { permission } from "process";
import { addRole, updateRole } from "../../../lib/features/roles/roleActions";
const AddRoleMenu = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [formData, setFormData] = useState(null);
  const [roleName, setRoleName] = useState("");

  const [rolePerm, setRolePerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [empPerm, setEmpPerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [invoicePerm, setInvoicePerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [invtPerm, setInvtPerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [locPerm, setLocPerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [recyclePerm, setRecyclePerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [settingsPerm, setSettingsPerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  const [partsPerm, setPartsPerm] = useState({
    read: false,
    write: false,
    update: false,
    delete: false,
  });

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        setRoleName(selectedItem.name);
        setEmpPerm(selectedItem.privileges[0].permissions);
        setInvoicePerm(selectedItem.privileges[1].permissions);
        setInvtPerm(selectedItem.privileges[2].permissions);
        setPartsPerm(selectedItem.privileges[3].permissions);
        setSettingsPerm(selectedItem.privileges[4].permissions);
        setLocPerm(selectedItem.privileges[5].permissions);
        setRecyclePerm(selectedItem.privileges[6].permissions);
        setRolePerm(selectedItem.privileges[7].permissions);
      }
    } else {
      setRoleName("");
      setEmpPerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setInvoicePerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setInvtPerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setPartsPerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setSettingsPerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setLocPerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setRecyclePerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
      setRolePerm({
        read: false,
        write: false,
        update: false,
        delete: false,
      });
    }
  }, [selectedItem, showSideMenu]);

  // For formData being updated side by side
  useEffect(() => {
    setFormData({
      name: roleName,
      privileges: [
        {
          name: "employees",
          permissions: empPerm,
        },
        {
          name: "invoices",
          permissions: invoicePerm,
        },
        {
          name: "inventory",
          permissions: invtPerm,
        },
        {
          name: "locations",
          permissions: locPerm,
        },
        {
          name: "recycled",
          permissions: recyclePerm,
        },
        {
          name: "settings",
          permissions: settingsPerm,
        },
        {
          name: "parts",
          permissions: partsPerm,
        },
        {
          name: "roles",
          permissions: rolePerm,
        },
      ],
    });
  }, [
    roleName,
    rolePerm,
    empPerm,
    invoicePerm,
    invtPerm,
    locPerm,
    recyclePerm,
    settingsPerm,
    partsPerm,
  ]);
  const onInputChange = (e) => {
    setRoleName(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (showSideMenu.mode === "edit") {
      dispatch(updateRole({ formData, id: selectedItem._id }));
    } else {
      dispatch(addRole(formData));
    }
    // dispatch(setShowSuccessModal(true));
    dispatch(setShowSideMenu({ value: false }));
  };

  useEffect(() => {
    if (showSideMenu.value && menuRef.current) {
      menuRef.current.scrollTop = 0;
    }
    // Set scroll top position when opened and when role added so that modal can be viewed
  }, [showSideMenu]);
  return (
    <div
      className={`absolute ${
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
        ref={menuRef}
        className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start "
      >
        <div className="p-6 flex flex-col space-y-4">
          <p className="font-semibold">
            {showSideMenu.mode === "edit" ? "Edit Role" : "Add New Role"}
          </p>
          {/* Role name input */}
          <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Role Name"
              value={roleName}
              onChange={onInputChange}
            />
          </div>
          <div
            className={`w-full flex flex-col space-y-4 ${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }`}
          >
            <p className=" font-semibold">Permissions</p>
            <p className=" ">
              {showSideMenu.mode === "edit"
                ? "Edit permissions to the role you are creating and manage your users effectively!"
                : "Assign permissions to the role you are creating and manage your           employees effectively!"}
            </p>
          </div>
        </div>
        {/* This additional container to make them opaque in preview mode */}
        <div
          className={`${
            showSideMenu.mode === "preview" && "opacity-50 pointer-events-none"
          }  flex flex-col  items-center w-full `}
        >
          {/* Toggle Line */}
          <PermissionMenu
            perm={rolePerm}
            setPerm={setRolePerm}
            title={"Roles & Permissions"}
          />
          <PermissionMenu
            perm={empPerm}
            setPerm={setEmpPerm}
            title={"Employees"}
          />
          <PermissionMenu
            perm={invoicePerm}
            setPerm={setInvoicePerm}
            title={"Invoices"}
          />
          <PermissionMenu
            perm={invtPerm}
            setPerm={setInvtPerm}
            title={"Inventory"}
          />
          <PermissionMenu
            perm={settingsPerm}
            setPerm={setSettingsPerm}
            title={"Settings"}
          />
          <PermissionMenu
            perm={locPerm}
            setPerm={setLocPerm}
            title={"Location"}
          />
          <PermissionMenu
            perm={partsPerm}
            setPerm={setPartsPerm}
            title={"Parts"}
          />
          <PermissionMenu
            perm={recyclePerm}
            setPerm={setRecyclePerm}
            title={"Recycled Items"}
          />
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
            {showSideMenu.mode === "edit" ? "Edit Role" : "Add Role"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoleMenu;
