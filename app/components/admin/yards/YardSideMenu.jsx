import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideMenu } from "../../../../lib/features/shared/sharedSlice";
import FancyInput from "../../common/FancyInput";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import GreenBtn from "../../../abstracts/GreenBtn";
import CrossIcon from "../../../assets/main/80-cross.svg";
import Image from "next/image";

const YardSideMenu = () => {
  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.shared);
  const [yardDateType, setYardDateType] = React.useState("text");

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
                ? "Edit Yard"
                : showSideMenu.mode === "preview"
                ? "Preview Yard"
                : "Add New Yard"}
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
            }  flex flex-col space-y-4   w-full `}
          >
            {/* Yard Name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Yard Name"
                name="yardName"
              />
            </div>

            {/* Yard Email input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Yard Email"
                name="yardEmail"
              />
            </div>

            {/* No of items input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="No. of Items"
                name="noOfItems"
              />
            </div>

            {/* Yard Date input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type={yardDateType}
                onClick={() => setYardDateType("date")}
                placeholder="Select Date"
                name="yardDate"
              />
            </div>

            {/* Yard Location input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Yard Location"
                name="yardLocation"
              />
            </div>
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

export default YardSideMenu;
