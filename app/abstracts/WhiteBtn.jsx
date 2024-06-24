import React from "react";

const WhiteBtn = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border border-gray-300 hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex space-x-2"
    >
      <p className="font-bold text-sm">{title}</p>
      {icon && <Image src={icon} alt="arrowIcon" />}
    </div>
  );
};

export default WhiteBtn;
