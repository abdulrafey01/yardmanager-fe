import React from "react";

import EditIcon from "../../assets/main/32-edit.svg";
import PrevIcon from "../../assets/main/33-eye.svg";
import DelIcon from "../../assets/main/34-trash.svg";
import CartIcon from "../../assets/main/42-cart.svg";
import DuplicateIcon from "../../assets/main/43-duplicate.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setDeleteLocationIndex,
  setShowDeleteLocationModal,
  setShowLocationSideMenu,
} from "../../../lib/features/locations/locationSlice";
import {
  setDeletePartIndex,
  setShowDeletePartModal,
  setShowPartSideMenu,
} from "../../../lib/features/parts/partSlice";
import {
  setDeleteInventoryIndex,
  setShowDeleteInventoryModal,
  setShowInventorySideMenu,
} from "../../../lib/features/inventory/inventorySlice";
const ActionMenu = ({ showActionMenu, index, type }) => {
  const dispatch = useDispatch();

  const renderPartActionMenu = () => {
    return (
      <div
        className={`bg-white border border-gray-300 ${
          showActionMenu === index ? "block" : "hidden"
        } shadow-lg absolute top-10 left-[-100px] p-3 flex flex-col justify-center items-start z-10 space-y-4 w-40 rounded-lg`}
      >
        <div
          onClick={() => {
            dispatch(
              setShowPartSideMenu({
                value: true,
                mode: "edit",
              })
            );
          }}
          className="cursor-pointer flex justify-center items-center space-x-2 "
        >
          <Image src={EditIcon} alt="edit" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Edit</p>
        </div>
        <div
          onClick={() => {
            dispatch(
              setShowPartSideMenu({
                value: true,
                mode: "preview",
              })
            );
          }}
          className="cursor-pointer flex justify-center items-center space-x-2 "
        >
          <Image src={PrevIcon} alt="preview" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Preview</p>
        </div>
        <div
          onClick={() => {
            dispatch(setDeletePartIndex(index));
            dispatch(setShowDeletePartModal(true));
            console.log("deleted");
          }}
          className=" flex cursor-pointer justify-center items-center space-x-2 "
        >
          <Image src={DelIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Delete</p>
        </div>
      </div>
    );
  };
  // Inventory action menu
  const renderInventoryActionMenu = () => {
    return (
      <div
        className={`bg-white border border-gray-300 ${
          showActionMenu === index ? "block" : "hidden"
        } shadow-lg absolute top-10 left-[-100px] p-3 flex flex-col justify-center items-start z-10 space-y-4 w-40 rounded-lg`}
      >
        <div
          onClick={() => {
            dispatch(
              setShowInventorySideMenu({
                value: true,
                mode: "edit",
              })
            );
          }}
          className="cursor-pointer flex justify-center items-center space-x-2 "
        >
          <Image src={EditIcon} alt="edit" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Edit</p>
        </div>
        <div
          onClick={() => {
            dispatch(
              setShowInventorySideMenu({
                value: true,
                mode: "preview",
              })
            );
          }}
          className="cursor-pointer flex justify-center items-center space-x-2 "
        >
          <Image src={PrevIcon} alt="preview" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Preview</p>
        </div>
        <div
          onClick={() => {
            dispatch(setDeleteInventoryIndex(index));
            dispatch(setShowDeleteInventoryModal(true));
            console.log("deleted");
          }}
          className=" flex cursor-pointer justify-center items-center space-x-2 "
        >
          <Image src={DelIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Delete</p>
        </div>
        <div
          onClick={() => {}}
          className=" flex cursor-pointer justify-center items-center space-x-2 "
        >
          <Image src={CartIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Add to invoice</p>
        </div>
        <div
          onClick={() => {}}
          className=" flex cursor-pointer justify-center items-center space-x-2 "
        >
          <Image src={DuplicateIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Duplicate</p>
        </div>
      </div>
    );
  };
  return type === "part" ? (
    renderPartActionMenu()
  ) : type === "inventory" ? (
    renderInventoryActionMenu()
  ) : (
    <div
      className={`bg-white border border-gray-300 ${
        showActionMenu === index ? "block" : "hidden"
      } shadow-lg absolute top-10 left-[-100px] p-3 flex flex-col justify-center items-start z-10 space-y-4 w-40 rounded-lg`}
    >
      <div
        onClick={() => {
          dispatch(
            setShowLocationSideMenu({
              value: true,
              mode: "edit",
            })
          );
        }}
        className="cursor-pointer flex justify-center items-center space-x-2 "
      >
        <Image src={EditIcon} alt="edit" height={20} width={20} />
        <p className="font-semibold hover:font-bold">Edit</p>
      </div>
      <div
        onClick={() => {
          dispatch(
            setShowLocationSideMenu({
              value: true,
              mode: "preview",
            })
          );
        }}
        className="cursor-pointer flex justify-center items-center space-x-2 "
      >
        <Image src={PrevIcon} alt="preview" height={20} width={20} />
        <p className="font-semibold hover:font-bold">Preview</p>
      </div>
      <div
        onClick={() => {
          dispatch(setDeleteLocationIndex(index));
          dispatch(setShowDeleteLocationModal(true));
          console.log("deleted");
        }}
        className=" flex cursor-pointer justify-center items-center space-x-2 "
      >
        <Image src={DelIcon} alt="delete" height={20} width={20} />
        <p className="font-semibold hover:font-bold">Delete</p>
      </div>
    </div>
  );
};

export default ActionMenu;
