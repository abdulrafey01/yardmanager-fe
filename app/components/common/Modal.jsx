import Image from "next/image";
import React, { useEffect } from "react";
import DelIcon from "../../assets/main/35-trash.svg";
import CrossIcon from "../../assets/main/36-x.svg";
import SuccessIcon from "../../assets/main/40-successIcon.svg";
import RestoreIcon from "../../assets/main/56-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowDeleteModal,
  setShowSuccessModal,
} from "../../../lib/features/shared/sharedSlice";
import {
  deleteItemsPermanently,
  setShowRestoreModal,
} from "../../../lib/features/deleted-items/deletedItemsSlice";
import DeleteModal from "../common/DeleteModal";
import RestoreModal from "../common/RestoreModal";
import SuccessModal from "../common/SuccessModal";
const Modal = () => {
  const dispatch = useDispatch();
  const { deleteIndex, showDeleteModal, showSuccessModal, currentPage } =
    useSelector((state) => state.shared);
  const { showRestoreModal } = useSelector((state) => state.deletedItems);

  return (
    <div
      className={`fixed z-20 w-full h-full  ${
        // Show the modal if either of them are true
        showDeleteModal || showSuccessModal || showRestoreModal
          ? "block"
          : "hidden"
      }`}
    >
      {/* // Outer Black on whole screen till scroll end */}
      <div className="absolute z-20 bg-black opacity-50 w-full h-full"></div>
      {/* Container equal to screen to middle the modal */}
      <div className="w-full relative z-[60] h-screen flex justify-center items-center">
        {/* DeleteModal */}
        <DeleteModal />
        {/* Restore Modal */}

        <RestoreModal />
        {/* Success Modal */}
        <SuccessModal />
      </div>
    </div>
  );
};

export default Modal;
