import React from "react";
import DotsIcon from "../../assets/main/31-icon.svg";
import { useSelector } from "react-redux";

const TableHead = ({ titles }) => {
  const { currentPage } = useSelector((state) => state.shared);

  const renderFirstCell = (title) => {
    // Only for Invoices and Parts page we render the first cell larger
    if (
      currentPage === "Invoices" ||
      currentPage === "Parts" ||
      currentPage === "Dashboard"
    ) {
      return <p className=" min-w-16 p-3 bg-[#f2fff8] flex-1">{title}</p>;
    } else {
      return <p className=" min-w-16 p-3 bg-[#f2fff8] ">{title}</p>;
    }
  };

  const renderBadgeCells = (title) => {
    if (
      currentPage === "Vehicle" ||
      currentPage === "DeletedItems" ||
      currentPage === "Inventory"
    ) {
      return <p className=" min-w-24 p-3 bg-[#f2fff8] flex-1">{title}</p>;
    } else {
      return <p className=" min-w-16 p-3 bg-[#f2fff8] flex-1">{title}</p>;
    }
  };

  return (
    <div className=" font-bold bg-[#f2fff8] border border-[#EDEEF2] text-sm flex justify-between ">
      {titles.map((title, index) =>
        index === 0 ? (
          renderFirstCell(title)
        ) : index === 1 ? ( // for parts page
          currentPage === "Parts" ? (
            <p className=" min-w-16 p-3 bg-[#f2fff8] flex-[2]">{title}</p>
          ) : (
            <p className=" min-w-16 p-3 bg-[#f2fff8] flex-1">{title}</p>
          )
        ) : index === 3 ? (
          renderBadgeCells(title)
        ) : index === 4 || index === 5 || index === 7 ? (
          renderBadgeCells(title)
        ) : (
          <p className=" min-w-16 p-3 bg-[#f2fff8] flex-1">{title}</p>
        )
      )}
      {currentPage === "DeletedItems" ||
      currentPage === "Invoices" ||
      currentPage === "Inventory" ? (
        <p className=" min-w-24 sm:min-w-16 text-center p-3 bg-[#f2fff8]">
          Action
        </p>
      ) : (
        <p className=" min-w-16 p-3 bg-[#f2fff8]">Action</p>
      )}
    </div>
  );
};

export default TableHead;
