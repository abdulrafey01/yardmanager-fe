"use client";
import React from "react";
import SignalIcon from "../../assets/main/71-wifi.svg";
import CardsIcon from "../../assets/main/72-cards.svg";
import Image from "next/image";

const PaymentCard = () => {
  const [dateInputType, setDateInputType] = React.useState("text");
  return (
    <div className="flex-1 flex flex-col  border border-gray-300 rounded-lg p-4 gap-4">
      {/* Heading Div First */}
      <div className="flex justify-between items-center ">
        {/* Text container */}
        <div className="flex flex-col items-start gap-2">
          <p className="font-semibold text-xl">Payment Method</p>
          <p className="text-gray-600 text-sm font-medium">
            Please provide the following details!
          </p>
        </div>
        {/*  Icon container */}
        <div className="flex gap-4">
          {/* Round Menu icon */}
          <div className="w-8 h-8 rounded-full border border-gray-400 gap-[2px] flex flex-col justify-center items-center">
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          </div>
          {/* Signal Icon */}
          <Image src={SignalIcon} alt="SignalIcon" />
        </div>
      </div>

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
      {/* Check out button */}
      <div className="w-full">
        <div
          href="/subscription/my-plans"
          className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
        >
          <p className="font-semibold text-sm">Proceed to Check Out</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
