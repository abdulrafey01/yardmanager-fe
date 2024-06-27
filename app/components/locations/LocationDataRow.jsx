import React from "react";
import RoleActionMenu from "../roles/RoleActionMenu";
import Badge from "../invoices/Badge";

import MenuIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";

const TableDataRow = ({ titles, tableType, showMenu, setShowMenu, index }) => {
  return (
    <tr className="border relative border-[#EDEEF2] even:bg-[#a5a5a50a] flex justify-between items-center w-full ">
      {titles.map((title, index) => (
        <td
          onClick={() => setShowMenu(-1)}
          key={index}
          className="p-3 text-left"
        >
          {title}
        </td>
      ))}

      <td className="pl-8 relative  text-left ">
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
          className="cursor-pointer"
          src={MenuIcon}
          alt="menu"
        />
        {/* Action Menu Container */}
        {tableType === "roles" && (
          <RoleActionMenu showActionMenu={showMenu} index={index} />
        )}
      </td>
    </tr>
  );
};

export default TableDataRow;
