import React from "react";

import YardIcon from "../../assets/auth/yardicon-1.svg";
import YardIconW from "../../assets/main/58-logow.svg";
import Image from "next/image";
const Header = ({ darkType }) => {
  return (
    <div className="  flex justify-start items-center text-white space-x-1">
      {darkType ? (
        <Image src={YardIconW} alt="logo" />
      ) : (
        <Image src={YardIcon} alt="logo" />
      )}
      <div className={`h-6 w-[2.2px] bg-white ${darkType && "hidden"}`}></div>
      <p
        className={`text-xs sm:text-base ${
          darkType ? "text-black" : "text-white"
        }`}
      >
        My Yard Manager
      </p>
    </div>
  );
};

export default Header;
