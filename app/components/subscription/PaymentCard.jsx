"use client";
import React from "react";
import SignalIcon from "../../assets/main/71-wifi.svg";
import CardsIcon from "../../assets/main/72-cards.svg";
import CirclesIcon from "../../assets/main/73-paycircles.svg";
import RoundMenuIcon from "../../components/subscription/RoundMenuIcon";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCookie } from "../../helpers/storage";
import { setShowToast } from "../../../lib/features/shared/sharedSlice";

const PaymentCard = ({
  isCheckedOut = true,
  setIsCheckedOut,
  card,
  setRefreshData,
}) => {
  const [dateInputType, setDateInputType] = React.useState("text");
  const [showMenu, setShowMenu] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deleteCard = async (id) => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_BASE_URL + "/subscription/delete-card/" + id,
        {
          headers: {
            Authorization: `Bearer ${
              getCookie("token") || window?.sessionStorage.getItem("token")
            }`,
          },
        }
      );
      setRefreshData(true);
      setShowMenu(false);
    } catch (error) {
      dispatch(
        setShowToast({ value: true, msg: error.response.data.error, red: true })
      );
    }
  };

  return (
    <div
      className={`flex flex-1 flex-col  border border-gray-300 rounded-lg  `}
    >
      <div className="w-full p-4 flex flex-col gap-4">
        {/* Heading Div First */}
        <div className="flex justify-between items-center ">
          {/* Text container */}
          <div className="flex flex-col items-start gap-2">
            <p className="font-semibold text-xl text-start ">
              {/* Capitalizing the first letter */}
              {card?.card?.brand.charAt(0).toUpperCase() +
                card?.card?.brand.slice(1)}
            </p>
            {!isCheckedOut && (
              <p className="text-gray-600 text-start text-sm font-medium">
                Please provide the following details!
              </p>
            )}
          </div>
          {/*  Icon container */}
          <div
            className={`flex  ${
              isCheckedOut && " flex-1 justify-center items-center"
            } gap-4`}
          >
            {/* Round Menu icon */}
            <div className="relative ">
              <div
                onBlur={() =>
                  setTimeout(() => {
                    setShowMenu(false);
                  }, 300)
                }
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <RoundMenuIcon />
              </div>
              <div
                className={`${
                  showMenu ? "block" : "hidden"
                } bg-white z-50 overflow-auto no-scrollbar absolute top-[135%] w-[100px]   left-0  rounded-lg border border-gray-300 p-3 flex flex-col justify-start max-h-40`}
              >
                <div
                  onClick={() => {
                    deleteCard(card?.id);
                  }}
                  className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                >
                  Delete
                </div>{" "}
              </div>
            </div>
            {/* Signal Icon */}
            <Image src={SignalIcon} alt="SignalIcon" />
          </div>
        </div>

        {isCheckedOut && (
          <div className="flex justify-start items-center gap-4">
            <Image src={CirclesIcon} alt="CirclesIcon" />
            <p className="text-lg font-semibold">
              {user?.data?.name?.first} {user?.data?.name?.last}
            </p>
          </div>
        )}

        {isCheckedOut && (
          <div className="flex flex-col items-start mt-6">
            <p className="text-black  text-base ">Expiry Date</p>
            <p className="font-semibold">
              {card?.card?.exp_month} / {card?.card?.exp_year}
            </p>
          </div>
        )}
      </div>

      {isCheckedOut && (
        <div>
          <hr className="w-[80%]" />
          <p className="text-start font-medium p-4">*****{card?.card?.last4}</p>
        </div>
      )}
      {/* Inputs container */}
      <div className={`flex flex-col gap-4 p-4 ${isCheckedOut && "hidden"}`}>
        {/* Card Number Input */}
        <div className="w-full bg-white py-1 pl-4 pr-1 hover:border-gray-400 rounded-lg border border-[#D0D5DD] flex justify-between items-center">
          <input
            className="w-full outline-none"
            type="number"
            placeholder="Card Number"
            name="cardnumber"
            autoComplete="off"
          />
          <Image className="hidden sm:block" src={CardsIcon} alt="CardsIcon" />
        </div>
        {/* Data and code container */}
        <div className="flex w-full gap-4">
          <div className="w-full bg-white p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
            <input
              onClick={() => setDateInputType("date")}
              className="w-full outline-none"
              type={dateInputType}
              placeholder="Expiry Date"
              name="cardnumber"
              autoComplete="off"
            />
          </div>
          <div className="w-full bg-white p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
            <input
              className="w-full outline-none"
              type="number"
              placeholder="Security Code"
              name="cardnumber"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="w-full bg-white p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Card Name"
            name="cardnumber"
            autoComplete="off"
          />
        </div>

        <div className="w-full" onClick={() => setIsCheckedOut(true)}>
          <div
            href="/subscription/my-plans"
            className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
          >
            <p className="font-semibold text-sm">Proceed to Check Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
