import React from "react";

const RowTableHead = ({ colData }) => {
  return (
    <div className=" font-bold bg-[#f2fff8] border border-[#EDEEF2] text-sm flex justify-between ">
      {colData.map((title, index) => (
        <p className=" min-w-32 p-3 bg-[#f2fff8] flex-1">{title}</p>
      ))}
      <p className=" min-w-32 p-3 bg-[#f2fff8] ">Action</p>
    </div>
  );
};

export default RowTableHead;
