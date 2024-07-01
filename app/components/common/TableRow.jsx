import React from "react";

import DotsIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import ActionMenu from "../common/ActionMenu";
import { useSelector } from "react-redux";
import Badge from "../invoices/Badge";
import "../../styles.css";

const TableRow = ({ titles, showMenu, setShowMenu, rowIndex }) => {
  const { currentPage } = useSelector((state) => state.shared);
  const renderPartRow = (titles) => {
    // If index is 1 which means it has variant array then map the variant array differently
    return titles.map((title, index) =>
      index === 1 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 overflow-x-scroll sm:overflow-visible p-3 flex-1  items-center flex space-x-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[1].map((variant, index) => (
            <div
              className={`bg-[#1212121A] rounded-full min-w-20 py-3 h-4 flex justify-center items-center text-xs `}
            >
              {variant}
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };

  const renderInvoiceRow = (titles) => {
    return titles.map((title, index) =>
      index === 6 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  p-3 overflow-auto no-scrollbar flex-1 flex items-center`}
        >
          <Badge received={title === "Received"} />
        </div>
      ) : (
        <div
          onClick={() => setShowMenu(-1)}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16 overflow-auto no-scrollbar  p-3 flex-1 flex items-center`}
        >
          {title}
        </div>
      )
    );
  };

  const renderDeletedItemsRow = (titles) => {
    return titles.map((title, index) =>
      index === 3 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 p-3 flex-1 overflow-x-auto no-scrollbar  flex space-x-1  items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[3].map((model, index) => (
            <div
              className={`bg-[#1212121A]  rounded-full min-w-20 py-3 h-4 flex justify-center items-center text-xs `}
            >
              {model}
            </div>
          ))}
        </div>
      ) : index === 4 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 overflow-x-auto no-scrollbar p-3 flex-1  flex  items-center space-x-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[4].map((make, index) => (
            <div
              className={`bg-[#1212121A]  rounded-full min-w-20 py-3 h-4 flex justify-center items-center text-xs `}
            >
              {make}
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };
  const renderVehicleRow = (titles) => {
    return titles.map((title, index) =>
      // if index is 3 show it like this and if index is 4 show it like that
      index === 3 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 p-3 flex-1 overflow-x-auto no-scrollbar items-center flex space-x-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[3].map((model, index) => (
            <div
              className={`bg-[#1212121A]  rounded-full min-w-20 py-3 h-4 flex justify-center items-center text-xs `}
            >
              {model}
            </div>
          ))}
        </div>
      ) : index === 4 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 overflow-x-auto no-scrollbar p-3 flex-1   items-center flex space-x-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[4].map((make, index) => (
            <div
              className={`bg-[#1212121A]  rounded-full min-w-20 py-3 h-4 flex justify-center items-center text-xs `}
            >
              {make}
            </div>
          ))}
        </div>
      ) : index === 6 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 overflow-x-auto no-scrollbar p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Year"
              className="w-full outline-none bg-transparent"
              value={titles[6]}
            />
          </div>
        </div>
      ) : index === 7 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 overflow-x-auto no-scrollbar p-3 flex items-center flex-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Year"
              className="w-full outline-none bg-transparent"
              value={titles[7]}
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-16 overflow-x-auto no-scrollbar p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };

  return (
    <div className="w-full flex flex-col ">
      {/* Row */}
      {/* For even rows bg-white */}
      <div
        className={`w-full border border-[#EDEEF2] text-sm flex justify-between `}
      >
        {currentPage === "Parts"
          ? renderPartRow(titles)
          : currentPage === "Invoices"
          ? renderInvoiceRow(titles)
          : currentPage === "DeletedItems"
          ? renderDeletedItemsRow(titles)
          : currentPage === "Vehicle"
          ? renderVehicleRow(titles)
          : titles.map((title, index) => (
              <div
                onClick={() => setShowMenu(-1)}
                className={` ${
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-[#fbfbfb] flex items-center"
                } min-w-16  p-3 overflow-auto no-scrollbar flex-1`}
              >
                {title}
              </div>
            ))}
        <div
          className={` min-w-16 p-3 pl-8 relative text-center flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <Image
            onClick={() => {
              // if clicked on same row icon, close the Menu else close all and open respective row icon
              if (showMenu === rowIndex) {
                setShowMenu(-1);
              } else {
                setShowMenu(-1);
                setShowMenu(rowIndex);
              }
            }}
            src={DotsIcon}
            alt="MenuIcon"
            className="cursor-pointer "
          ></Image>
          <ActionMenu showActionMenu={showMenu} index={rowIndex} />
        </div>
      </div>
    </div>
  );
};

export default TableRow;
