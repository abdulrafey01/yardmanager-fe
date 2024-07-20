import SuccessIcon from "../../assets/main/40-successIcon.svg";
import React, { useEffect } from "react";

import { setShowSuccessModal } from "../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
const SuccessModal = () => {
  const { showSuccessModal, currentPage } = useSelector(
    (state) => state.shared
  );

  const dispatch = useDispatch();
  const { toastmsg } = useSelector((state) => state.locations);
  // Disappear success modal after 3 seconds bc it doesnt have cross icon
  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => {
        dispatch(setShowSuccessModal(false));
      }, 3000);
    }
  }, [showSuccessModal]);

  const renderSuccessText = () => {
    switch (currentPage) {
      case "Parts":
        return "Part has been successfully added to  inventory";
    }
  };
  return (
    showSuccessModal && (
      <div className="bg-white py-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col justify-center items-center">
        {/* First row */}
        <Image
          src={SuccessIcon}
          alt="SuccessIcon"
          width={50 * 2}
          height={50 * 2}
        />
        <p className="text-xs lg:text-base font-semibold">
          {renderSuccessText()}
        </p>
      </div>
    )
  );
};

export default SuccessModal;
