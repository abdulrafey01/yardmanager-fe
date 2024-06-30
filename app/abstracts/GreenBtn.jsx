import Image from "next/image";
import React from "react";

const GreenBtn = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] hover:bg-[#37fd93]  text-left rounded-lg flex space-x-2"
    >
      <p className="font-bold text-sm">{title}</p>
      {icon && <Image src={icon} alt="arrowIcon" />}
    </div>
  );
};

export default GreenBtn;
