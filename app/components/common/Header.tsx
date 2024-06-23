import React from "react";

import YardIcon from "../../assets/auth/yardicon-1.svg";
import Image from "next/image";
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="  flex justify-start items-center text-white space-x-1">
      <Image src={YardIcon} alt="logo" />
      <div className="h-6 w-[2.2px] bg-white"></div>
      <p className="text-xs sm:text-base">My Yard Manager</p>
    </div>
  );
};

export default Header;
