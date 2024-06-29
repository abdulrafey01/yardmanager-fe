import React from "react";

import DotsIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import ActionMenu from "../common/ActionMenu";

const TableRow = ({ titles, showMenu, setShowMenu, rowIndex, type }) => {
  const renderPartRow = (titles) => {
    // If index is 1 which means it has variant array then map the variant array differently
    return titles.map((title, index) =>
      index === 1 ? (
        <div
          onClick={() => setShowMenu(-1)}
          className={` min-w-32 overflow-x-scroll sm:overflow-visible p-3 flex-1  flex space-x-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
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
        <p
          onClick={() => setShowMenu(-1)}
          className={` min-w-32 p-3 flex-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {title}
        </p>
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
        {type === "part"
          ? renderPartRow(titles)
          : titles.map((title, index) => (
              <div
                onClick={() => setShowMenu(-1)}
                className={` ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
                } min-w-32  p-3 flex-1`}
              >
                {title}
              </div>
            ))}
        <div
          className={` min-w-32 p-3 pl-8 relative text-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
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
          <ActionMenu type={type} showActionMenu={showMenu} index={rowIndex} />
        </div>
      </div>
    </div>
  );
};

export default TableRow;
