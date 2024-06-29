import React from "react";
import DotsIcon from "../../assets/main/31-icon.svg";

const TableHead = ({ titles }) => {
  return (
    <div className=" font-bold bg-[#f2fff8] border border-[#EDEEF2] text-sm flex justify-between ">
      {titles.map((title, index) => (
        <p className=" min-w-32 p-3 bg-[#f2fff8] flex-1">{title}</p>
      ))}
      <p className=" min-w-32 p-3 bg-[#f2fff8]">Action</p>
    </div>
  );
};

export default TableHead;
