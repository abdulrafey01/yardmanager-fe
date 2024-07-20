import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideMenu } from "../../../../lib/features/shared/sharedSlice";
import FancyInput from "../../common/FancyInput";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import GreenBtn from "../../../abstracts/GreenBtn";
import CrossIcon from "../../../assets/main/80-cross.svg";
import Image from "next/image";

const SubscriptionAdminSideMenu = () => {
  const dispatch = useDispatch();
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
          console.log("clicked");
        }}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div className="flex-1  bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start ">
        <div className="p-6 flex w-full flex-col space-y-4">
          <div className="flex justify-between items-center w-full ">
            <p className="font-semibold">
              {showSideMenu.mode === "edit"
                ? "Edit Subscription"
                : showSideMenu.mode === "preview"
                ? "Preview Subscription"
                : "Add New Subscription"}
            </p>
            <Image
              src={CrossIcon}
              alt="CrossIcon"
              className="cursor-pointer"
              onClick={() => dispatch(setShowSideMenu({ value: false }))}
            />
          </div>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col gap-5  w-full `}
          >
            {/* Subscription Name input */}
            <FancyInput
              identity={"subscriptionName"}
              placeholder={"Subscription Name"}
            />
            {/* Subscription Email input */}
            <FancyInput
              identity={"subscriptionEmail"}
              placeholder={"Subscription Email"}
            />
            {/* Subscription Start Date input */}
            <FancyInput
              type={"date"}
              identity={"subscriptionStartDate"}
              placeholder={"Start Date"}
            />
            {/* Subscription End Date input */}
            <FancyInput
              type={"date"}
              identity={"subscriptionEndDate"}
              placeholder={"End Date"}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex w-full p-4  justify-center  gap-4 flex-1 items-end">
          <div className="flex-1">
            <WhiteBtn
              onClick={() => dispatch(setShowSideMenu({ value: false }))}
              title={"Cancel"}
              textCenter={true}
            />
          </div>
          <div className="flex-1">
            <GreenBtn title={"Save"} textCenter={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAdminSideMenu;
