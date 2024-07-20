import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideMenu } from "../../../lib/features/shared/sharedSlice";
import CardIcon from "../../assets/main/74-bankcard.svg";
import BankIcon from "../../assets/main/75-bank.svg";
import TickIcon from "../../assets/main/70-tick.svg";
import FancyInput from "../../components/common/FancyInput";
import Image from "next/image";
import WhiteBtn from "../../abstracts/WhiteBtn";
import GreenBtn from "../../abstracts/GreenBtn";
import { setShowRestoreModal } from "../../../lib/features/deleted-items/deletedItemsSlice";
import { setShowConfirmModal } from "../../../lib/features/subscription/subscriptionSlice";

const SubscriptionSideMenu = () => {
  const dispatch = useDispatch();
  const [selectedBox, setSelectedBox] = React.useState(1);

  const { showSideMenu } = useSelector((state) => state.shared);
  return (
    <div
      className={`fixed ${
        showSideMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={() => {
          dispatch(setShowSideMenu({ value: false }));
        }}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div className="flex-1 bg-white  overflow-y-auto p-4 no-scrollbar flex flex-col justify-start items-start gap-4 ">
        {/* Texts */}
        <div className=" flex w-full flex-col gap-4">
          <p className="font-semibold">Add Payment Method</p>
          <p className="font-medium">Choose payment method below</p>
        </div>
        {/* Boxes container */}
        <div className="flex w-full gap-4 ">
          {/* Box 1 */}
          <div
            onClick={() => setSelectedBox(1)}
            className={`flex-1 relative rounded-xl flex flex-col gap-4 p-8 justify-center items-center border-2  ${
              selectedBox === 1 && "border-black"
            }`}
          >
            <Image src={CardIcon} alt="CardIcon" />
            <p>Pay with Card</p>
            {selectedBox === 1 && (
              <div className="absolute -top-3  bg-white -right-2 w-8 h-8 rounded-full border-2 border-black flex justify-center items-center">
                <Image src={TickIcon} alt="TickIcon" />
              </div>
            )}
          </div>
          {/* Box 2 */}
          <div
            onClick={() => setSelectedBox(2)}
            className={`flex-1 relative rounded-xl flex flex-col gap-4 p-8 justify-center items-center border-2  ${
              selectedBox === 2 && "border-black"
            }`}
          >
            <Image src={BankIcon} alt="CardIcon" />
            <p>Pay with Bank</p>
            {selectedBox === 2 && (
              <div className="absolute -top-3  bg-white -right-2 w-8 h-8 rounded-full border-2 border-black flex justify-center items-center">
                <Image src={TickIcon} alt="TickIcon" />
              </div>
            )}
          </div>
        </div>
        {/* Card details */}
        <div className="flex flex-col w-full gap-4">
          <p className="font-semibold tracking-wide">Add credit card details</p>
          {/* Card number input */}
          <FancyInput identity={"cardNumber"} placeholder={"Card Number"} />
          {/* Date and CVC input */}
          <div className="flex w-full  gap-4">
            <FancyInput identity={"expDate"} placeholder={"Expiration Date"} />
            <FancyInput identity={"cvc"} placeholder={"CVC"} />
          </div>
          {/* Card Holder name input */}
          <FancyInput identity={"name"} placeholder={"Card Holder Name"} />
        </div>

        {/* Buttons */}
        <div className="flex w-full justify-center  gap-4 flex-1 items-end">
          <div className="flex-1">
            <WhiteBtn
              onClick={() => dispatch(setShowSideMenu({ value: false }))}
              title={"Cancel"}
              textCenter={true}
            />
          </div>
          <div className="flex-1">
            <GreenBtn
              onClick={() => {
                dispatch(setShowConfirmModal(true));
              }}
              title={"Add Payment"}
              textCenter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSideMenu;
