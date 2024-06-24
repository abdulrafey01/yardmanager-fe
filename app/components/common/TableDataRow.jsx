import React from "react";
import RoleActionMenu from "../roles/RoleActionMenu";
import Badge from "../invoices/Badge";

import MenuIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";

const TableDataRow = ({ titles, tableType, showMenu, setShowMenu, index }) => {
  return (
    <tr
      // On mouseleaving the row, close the action menu
      onMouseLeave={() => setShowMenu(-1)}
      className="border relative border-[#EDEEF2] even:bg-[#a5a5a50a] "
    >
      {/* If roles table thens= show serial number */}
      {tableType === "roles" ? (
        <td className=" p-3 text-left">{index + 1}</td>
      ) : null}
      {titles.map((title, index) => (
        <td key={index} className="p-3 text-left">
          {title}
        </td>
      ))}

      <td className="pl-6 text-left  ">
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
      </td>
      {/* Action Menu Container */}
      {tableType === "roles" && (
        <RoleActionMenu showActionMenu={showMenu} index={index} />
      )}
    </tr>
  );
};

export default TableDataRow;
