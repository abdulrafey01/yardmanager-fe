import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideMenu } from "../../../../lib/features/shared/sharedSlice";
import FancyInput from "../../common/FancyInput";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import GreenBtn from "../../../abstracts/GreenBtn";
import CrossIcon from "../../../assets/main/80-cross.svg";
import Image from "next/image";
import DropDownInput from "../../common/DropDownInput";

import MainInput from "../../common/MainInput";

import PWDIcon from "../../../assets/auth/2-AdornmentEnd.svg";

import PwdHideIcon from "../../../assets/main/66-hideeye.png";
const UserSideMenu = () => {
  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.shared);

  const [togglePWD, setTogglePWD] = React.useState(false);
  const [togglePWDC, setTogglePWDC] = React.useState(false);
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
                ? "Edit User"
                : showSideMenu.mode === "preview"
                ? "Preview User"
                : "Add New User"}
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
            {/* User Name input */}
            <FancyInput identity={"userName"} placeholder={"User Name"} />
            {/* User Email input */}
            <FancyInput identity={"userEmail"} placeholder={"Email Address"} />
            {/* Select Role */}
            <DropDownInput
              inputValue={""}
              setInputValue={() => {}}
              onSearch={() => {}}
              searchData={[]}
              placeholder={"Select Role"}
            />
            {/* User Date input */}
            <FancyInput
              type={"date"}
              identity={"userDate"}
              placeholder={"Select Date"}
            />
            {/* User Password input */}

            <div className="w-full ">
              <MainInput
                placeholder="Password"
                type={togglePWD ? "text" : "password"}
                icon={togglePWD ? PWDIcon : PwdHideIcon}
                onIconClick={() => setTogglePWD(!togglePWD)}
                // value={formState.password}
                onChange={(e) => {}}
                name={"password"}
              />
            </div>
            {/* Confirm password input */}
            <div className="w-full ">
              <MainInput
                placeholder="Confirm Password"
                type={togglePWDC ? "text" : "password"}
                icon={togglePWDC ? PWDIcon : PwdHideIcon}
                onIconClick={() => setTogglePWDC(!togglePWDC)}
                // value={formState.confirmPassword}
                onChange={(e) => {}}
                name={"confirmPassword"}
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
            <GreenBtn
              onClick={() => {
                setShowSideMenu({ value: false });
              }}
              title={"Save"}
              textCenter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideMenu;
