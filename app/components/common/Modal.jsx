import Image from "next/image";
import React, { useEffect } from "react";
import DelIcon from "../../assets/main/35-trash.svg";
import CrossIcon from "../../assets/main/36-x.svg";
import SuccessIcon from "../../assets/main/40-successIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowDeleteModal,
  setShowSuccessModal,
} from "../../../lib/features/shared/sharedSlice";
import { deleteInventory } from "../../../lib/features/inventory/inventorySlice";
import { deletePart } from "../../../lib/features/parts/partSlice";
import { deleteLocation } from "../../../lib/features/locations/locationSlice";
import { deleteInvoice } from "../../../lib/features/invoice/invoiceSlice";
import { deleteRole } from "../../../lib/features/roles/roleSlice";
import { deleteItemsPermanently } from "../../../lib/features/deleted-items/deletedItemsSlice";

const RoleModal = () => {
  const dispatch = useDispatch();
  const { deleteIndex, showDeleteModal, showSuccessModal, currentPage } =
    useSelector((state) => state.shared);
  // Disappear success modal after 3 seconds bc it doesnt have cross icon
  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => {
        dispatch(setShowDeleteModal(false));
        dispatch(setShowSuccessModal(false));
      }, 3000);
    }
  }, [showSuccessModal]);

  const deleteRow = () => {
    switch (currentPage) {
      case "Inventory":
        dispatch(deleteInventory(deleteIndex));
        break;
      case "Invoices":
        dispatch(deleteInvoice(deleteIndex));
        break;
      case "Locations":
        dispatch(deleteLocation(deleteIndex));
        break;
      case "Parts":
        dispatch(deletePart(deleteIndex));
      case "Roles":
        dispatch(deleteRole(deleteIndex));
        break;
      case "DeletedItems":
        dispatch(deleteItemsPermanently(deleteIndex));
        break;
      default:
        break;
    }
    dispatch(setShowDeleteModal(false));
  };

  const renderHeadText = () => {
    switch (currentPage) {
      case "Inventory":
        return "Delete Inventory";
      case "Invoices":
        return "Delete Invoice";
      case "Locations":
        return "Delete Location";

      case "Parts":
        return "Delete Part";
      case "Roles":
        return "Delete Role";
      case "DeletedItems":
        return "Delete Permanently";
      default:
        break;
    }
  };

  const renderMainText = () => {
    switch (currentPage) {
      case "Inventory":
        return "Are you sure you want to delete this part? Deleted parts will be moved to Deleted Items.";
        break;
      case "Invoices":
        return "Your Invoice will be Permanently Deleted. Are you sure you want to delete it? ";
        break;
      case "Locations":
        return "Are you sure you want to delete this location? Deleting it will completely remove it from the system.";
        break;
      case "Parts":
        return "Are you sure you want to delete this part? Deleting it will completely remove it from the system.";
      case "Roles":
        return "Are you sure you want to delete this role? Deleting it will remove all employees associated with this role from the system.";
        break;
      case "DeletedItems":
        return "Are you sure you want to delete this part? Deleting it will completely remove it from the system.";

      default:
        break;
    }
  };
  return (
    <div
      className={`fixed z-20 w-full h-full  ${
        // Show the modal if either of them are true
        showDeleteModal || showSuccessModal ? "block" : "hidden"
      }`}
    >
      {/* // Outer Black on whole screen till scroll end */}
      <div className="absolute z-20 bg-black opacity-50 w-full h-full"></div>
      {/* Container equal to screen to middle the modal */}
      <div className="w-full relative z-[60] h-screen flex justify-center items-center">
        {showDeleteModal && (
          <div className=" bg-white p-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col space-y-4 lg:space-y-8">
            {/* First row */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Image src={DelIcon} alt="DelIcon" />
                <p className="font-bold text-xs lg:text-base">
                  {renderHeadText()}
                </p>
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
              <p className="text-xs lg:text-base">{renderMainText()}</p>
            </div>
            <div className="flex space-x-2 lg:space-x-4">
              <div
                onClick={() => {
                  dispatch(setShowDeleteModal(false));
                }}
                className="flex p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={deleteRow}
                className="flex bg-[#D32F2F] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-white hover:bg-[#B71C1C] cursor-pointer"
              >
                Yes, Delete
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="bg-white py-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col justify-center items-center">
            {/* First row */}
            <Image
              src={SuccessIcon}
              alt="SuccessIcon"
              width={50 * 2}
              height={50 * 2}
            />
            <p className="text-xs lg:text-base font-semibold">
              Role Permission changed Succesfuly
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleModal;
