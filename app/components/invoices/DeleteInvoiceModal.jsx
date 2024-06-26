import Image from "next/image";
import React from "react";
import DelIcon from "../../assets/main/35-trash.svg";
import CrossIcon from "../../assets/main/36-x.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoice,
  setShowDeleteModal,
} from "../../../lib/features/invoice/invoiceSlice";
const DeleteInvoiceModal = () => {
  const dispatch = useDispatch();
  const { deleteInvoiceIndex, showDeleteModal } = useSelector(
    (state) => state.invoice
  );
  return (
    <div
      className={`fixed z-20 w-full h-full ${
        showDeleteModal ? "block" : "hidden"
      }`}
    >
      {/* // Outer Black on whole screen till scroll end */}
      <div className="absolute z-20 bg-black opacity-50 w-full h-full"></div>
      {/* Container equal to screen to middle the modal */}
      <div className="w-full relative z-[60] h-screen flex justify-center items-center">
        {/* Modal container */}
        <div className="bg-white p-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col space-y-4 lg:space-y-8">
          {/* First row */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Image src={DelIcon} alt="DelIcon" />
              <p className="font-bold text-xs lg:text-base">Delete Invoice</p>
            </div>
            <div
              onClick={() => {
                dispatch(setShowDeleteModal(false));
              }}
              className="cursor-pointer"
            >
              <Image src={CrossIcon} alt="CrossIcon" />
            </div>
          </div>
          {/* Second row */}
          <div>
            <p className="text-xs lg:text-base">
              Your Invoice will be Permanently Deleted. Are you sure you want to
              delete it?{" "}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="flex p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 hover:bg-gray-300 cursor-pointer">
              Cancel
            </div>
            <div
              onClick={() => {
                dispatch(deleteInvoice(deleteInvoiceIndex));
                dispatch(setShowDeleteModal(false));
              }}
              className="flex bg-[#D32F2F] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-white hover:bg-[#B71C1C] cursor-pointer"
            >
              Yes, Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInvoiceModal;
