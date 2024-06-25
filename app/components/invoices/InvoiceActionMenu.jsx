"use client";
import React from "react";

import EditIcon from "../../assets/main/32-edit.svg";
import PrevIcon from "../../assets/main/33-eye.svg";
import DelIcon from "../../assets/main/34-trash.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setDeleteInvoiceIndex,
  setShowDeleteModal,
} from "../../../lib/features/invoice/invoiceSlice";

const InvoiceActionMenu = ({ showActionMenu, index }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`bg-white border border-gray-300 ${
        showActionMenu === index ? "block" : "hidden"
      } shadow-lg absolute top-12 right-6 p-3 flex flex-col justify-center items-start z-10 space-y-4 w-40 rounded-lg`}
    >
      <div className=" flex justify-center items-center space-x-2 ">
        <Image src={EditIcon} alt="edit" height={20} width={20} />
        <p className="font-semibold">Edit</p>
      </div>
      <div className=" flex justify-center items-center space-x-2 ">
        <Image src={PrevIcon} alt="preview" height={20} width={20} />
        <p className="font-semibold">Preview</p>
      </div>
      <div
        onClick={() => {
          dispatch(setDeleteInvoiceIndex(index));
          dispatch(setShowDeleteModal(true));
          console.log("deleted");
        }}
        className=" flex cursor-pointer justify-center items-center space-x-2 "
      >
        <Image src={DelIcon} alt="delete" height={20} width={20} />
        <p className="font-semibold">Delete</p>
      </div>
    </div>
  );
};

export default InvoiceActionMenu;
