import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSideMenu,
  setShowToast,
} from "../../../../lib/features/shared/sharedSlice";
import FancyInput from "../../common/FancyInput";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import GreenBtn from "../../../abstracts/GreenBtn";
import CrossIcon from "../../../assets/main/80-cross.svg";
import Image from "next/image";

import DownArrow from "../../../assets/main/28-downarrow.svg";
import axios from "axios";
import { getCookie } from "../../../helpers/storage";
import DropDownInput from "../../common/DropDownInput";
import {
  fetchAllYards,
  searchYardByName,
} from "../../../../lib/features/yards/yardActions";
import { usePathname } from "next/navigation";

const SubscriptionAdminSideMenu = () => {
  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.shared);
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const [yardInputVal, setYardInputVal] = React.useState("");
  const { yardSearchData } = useSelector((state) => state.yards);
  const [yardId, setYardId] = React.useState(null);
  const pathName = usePathname();

  const onPlanNameClick = (val) => {
    setInputVal(val);
    setShowDropDown(!showDropDown);
  };

  const addSubscription = async () => {
    let companyId;
    if (pathName.includes("subscription-overview")) {
      companyId = yardId;
    } else {
      companyId = JSON.parse(localStorage.getItem("companyId"));
    }
    let token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/subscription/new-subscription",
        {
          priceId: inputVal.toLowerCase(),
          company: companyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        setShowToast({
          value: true,
          msg: "Subscription added successfully",
        })
      );
      setInputVal("");
      setYardId(null);
      setYardInputVal("");
      dispatch(setShowSideMenu({ value: false }));
      window.location.reload();
    } catch (error) {
      dispatch(
        setShowToast({
          value: true,
          msg: error.response.data.error,
          red: true,
        })
      );
    }
  };

  return (
    <div
      className={`fixed ${
        showSideMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={() => {
          setInputVal("");
          setYardId(null);
          setYardInputVal("");
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
              onClick={() => {
                setInputVal("");
                setYardId(null);
                setYardInputVal("");
                dispatch(setShowSideMenu({ value: false }));
              }}
            />
          </div>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col gap-5  w-full `}
          >
            <div className="w-full flex justify-between items-center relative p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                onClick={() => setShowDropDown(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowDropDown(false);
                  }, 300)
                }
                tabIndex={0}
                className="w-full outline-none cursor-pointer"
                type="text"
                placeholder="Select Plan"
                value={inputVal}
              />

              <Image
                onClick={() => setShowDropDown(!showDropDown)}
                className="cursor-pointer"
                src={DownArrow}
                alt="downarrow"
              />
              {/* Dropdown */}
              <div
                className={`${
                  showDropDown ? "block" : "hidden"
                } bg-white overflow-auto no-scrollbar z-50 absolute top-[110%] w-full left-0  rounded-lg border border-black p-3 flex flex-col justify-start max-h-40`}
              >
                <p
                  onClick={() => onPlanNameClick("Monthly")}
                  className="p-2 border-b-[1px] border-black cursor-pointer hover:bg-gray-300 "
                >
                  Monthly
                </p>
                <p
                  onClick={() => onPlanNameClick("Yearly")}
                  className="p-2 cursor-pointer hover:bg-gray-300 "
                >
                  Yearly
                </p>
              </div>
            </div>
            <div
              className={`${
                pathName.includes("subscription-overview") ? "block" : "hidden"
              }`}
            >
              <DropDownInput
                inputValue={yardInputVal}
                keyToShow={"name"}
                onSearch={searchYardByName}
                placeholder={"Select Yard"}
                searchData={yardSearchData}
                setIdFunc={(val) => {
                  setYardId(val);
                }}
                setInputValue={setYardInputVal}
                fetchAllFunc={fetchAllYards}
                key={"company"}
              />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex w-full p-4  justify-center  gap-4 flex-1 items-end">
          <div className="flex-1">
            <WhiteBtn
              onClick={() => {
                setInputVal("");
                setYardId(null);
                setYardInputVal("");
                dispatch(setShowSideMenu({ value: false }));
              }}
              title={"Cancel"}
              textCenter={true}
            />
          </div>
          <div className="flex-1">
            <GreenBtn
              onClick={addSubscription}
              title={"Subscribe"}
              textCenter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAdminSideMenu;
