import React from "react";
import RoundMenuIcon from "./RoundMenuIcon";
import BankIcon from "../../assets/main/77-bank.svg";
import Image from "next/image";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const BankCard = ({ isCheckedOut = true }) => {
  return (
    <div
      className={`flex-1 w-full border flex flex-col gap-4 p-4 border-gray-300 rounded-lg ${
        !isCheckedOut && "hidden"
      }`}
    >
      {/* First row */}
      <div className="flex justify-between items-center">
        <div className="flex items-end">
          <p className="text-xl font-bold">Bank/</p>
          <p className="text-sm font-medium">Abu Dhabi</p>
        </div>
        <RoundMenuIcon />
      </div>

      {/* Second row */}
      <Image src={BankIcon} alt="BankIcon" />

      {/* Third Row */}
      <div className="flex flex-col gap-1 items-start">
        <p
          className={`font-bold text-[#475569]  text-lg tracking-widest ${rubik.className}`}
        >
          ADC54268K986P32
        </p>{" "}
        <p className="text-sm text-[#475569]">ABU DHABI COMMERCIAL BANK</p>
      </div>

      {/* Fourth ROw */}
      <p className="text-start text-[#475569] font-semibold">Mashaim Tariq</p>
    </div>
  );
};

export default BankCard;
