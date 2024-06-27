import Image from "next/image";
import DotsIcon from "../../assets/main/31-icon.svg";
import React from "react";

const RowTableData = ({ titles }) => {
  return (
    <div className="w-full flex flex-col ">
      {/* Row */}
      <div className="w-full border border-[#EDEEF2] text-sm flex justify-between ">
        {titles.map((data, index) => (
          <div className=" min-w-32  p-3 flex-1">{data}</div>
        ))}
        <div className="min-w-32 p-3 pl-8 ">
          <Image src={DotsIcon} alt="MenuIcon"></Image>
        </div>
      </div>
    </div>
  );
};

export default RowTableData;
