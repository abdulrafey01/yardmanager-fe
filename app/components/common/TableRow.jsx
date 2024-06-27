import React from "react";

import DotsIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import ActionMenu from "../common/ActionMenu";

const TableRow = ({ titles, showMenu, setShowMenu, index }) => {
  return (
    <div className="w-full flex flex-col ">
      {/* Row */}
      <div className="w-full border border-[#EDEEF2] text-sm flex justify-between ">
        {titles.map((title, index) => (
          <div
            onClick={() => setShowMenu(-1)}
            className=" min-w-32  p-3 flex-1"
          >
            {title}
          </div>
        ))}
        <div className=" min-w-32 p-3 pl-8 relative text-center ">
          <Image
            onClick={() => {
              // if clicked on same row icon, close the Menu else close all and open respective row icon
              if (showMenu === index) {
                setShowMenu(-1);
              } else {
                setShowMenu(-1);
                setShowMenu(index);
              }
            }}
            src={DotsIcon}
            alt="MenuIcon"
            className="cursor-pointer "
          ></Image>
          <ActionMenu showActionMenu={showMenu} index={index} />
        </div>
      </div>
    </div>
  );
};

export default TableRow;
