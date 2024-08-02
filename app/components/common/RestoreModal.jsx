import React from "react";

import CrossIcon from "../../assets/main/36-x.svg";
import DollarIcon from "../../assets/main/76-dollar.svg";

import RestoreIcon from "../../assets/main/56-icon.svg";
import Image from "next/image";

import { setShowRestoreModal } from "../../../lib/features/deleted-items/deletedItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { restoreInventory } from "../../../lib/features/deleted-items/deletedItemsActions";
import { setShowConfirmModal } from "../../../lib/features/subscription/subscriptionSlice";

const RestoreModal = () => {
  const { showRestoreModal } = useSelector((state) => state.deletedItems);
  const { confirmModal } = useSelector((state) => state.subscribe);
  const { selectedItem } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    (showRestoreModal || confirmModal) && (
      <div className=" bg-white p-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col space-y-4 lg:space-y-8">
        {/* First row */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {confirmModal ? (
              <>
                <Image src={DollarIcon} alt="RestoreIcon" />
                <p className="font-bold text-xs lg:text-base">
                  Confirm Subscription
                </p>
              </>
            ) : (
              <>
                <Image src={RestoreIcon} alt="RestoreIcon" />
                <p className="font-bold text-xs lg:text-base">Restore Item</p>
              </>
            )}
          </div>
          <div
            onClick={() => {
              dispatch(setShowRestoreModal(false));
            }}
            className="cursor-pointer"
          >
            <Image src={CrossIcon} alt="CrossIcon" />
          </div>
        </div>
        {/* Second row */}
        <div>
          <p className="text-xs lg:text-base">
            {confirmModal
              ? "Are you sure you want to subscribe to this plan?"
              : " Are you sure you want to restore this item? Restoring it will add it back to your inventory."}
          </p>
        </div>
        <div className="flex space-x-2 lg:space-x-4">
          <div
            onClick={() => {
              dispatch(setShowRestoreModal(false));
            }}
            className="flex p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 font-semibold rounded-lg flex-1 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </div>
          {confirmModal ? (
            <div
              onClick={() => {
                dispatch(setShowConfirmModal(false));
              }}
              className="flex bg-[#78FFB6] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-black font-bold hover:bg-[#49fb9c] cursor-pointer"
            >
              Confirm
            </div>
          ) : (
            <div
              onClick={() => {
                dispatch(
                  restoreInventory({
                    id: selectedItem._id,
                    isAdmin: user?.userType === "admin",
                  })
                );
                dispatch(setShowRestoreModal(false));
              }}
              className="flex bg-[#78FFB6] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-black font-bold hover:bg-[#49fb9c] cursor-pointer"
            >
              Yes, Restore
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default RestoreModal;
