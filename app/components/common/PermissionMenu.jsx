import React from "react";
import DownArrowIcon from "../../assets/main/39-downarrow.svg";
import Image from "next/image";
import GreenToggle from "./GreenToggle";

const PermissionMenu = ({ title }) => {
  return (
    <div className="border-b-2 p-6 border-gray-100 flex  justify-between  w-full items-center">
      <GreenToggle title={title} />
      <Image src={DownArrowIcon} alt="DownArrowIcon" />
    </div>
  );
};

export default PermissionMenu;
