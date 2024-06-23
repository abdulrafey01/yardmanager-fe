import React from "react";
import ArrowIcon from "../../assets/main/26-arrow.svg";
import Avatar from "../../assets/main/27-avatar.svg";
import DownArrowIcon from "../../assets/main/28-downarrow.svg";
import Image from "next/image";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <div className="w-full bg-white p-3 flex justify-between items-center">
      <div className="flex space-x-2 cursor-pointer">
        <p className="text-[#4A5578] ">Dashboard</p>
        <Image src={ArrowIcon} alt="arrowIcon" />
      </div>
      <div className="flex space-x-2 justify-center items-center">
        <div>
          <Image src={Avatar} alt="avatar" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Noraiz Shahid</p>
          <p className="text-xs">Shop Owner</p>
        </div>
        <div className="p-2">
          <Image src={DownArrowIcon} alt="DownArrowIcon" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
