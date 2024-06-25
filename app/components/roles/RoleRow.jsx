"use client";
import React from "react";

import MenuIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import InvoiceActionMenu from "../invoices/InvoiceActionMenu";
const RoleRow = ({ role, employees, index, showMenu, setShowMenu }) => {
  return (
    <tr
      // On mouseleaving the row, close the action menu
      onMouseLeave={() => {
        console.log("onmouseleave");
        setShowMenu(-1);
      }}
      className="border relative border-[#EDEEF2] even:bg-[#a5a5a50a] "
    >
      <td className=" p-3 text-left">{index + 1}</td>
      <td className=" p-3 text-left">{role}</td>
      <td className=" p-3 text-left">{employees}</td>
      <td className=" pl-6 text-left ">
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
      <InvoiceActionMenu showActionMenu={showMenu} index={index} />
    </tr>
  );
};

export default RoleRow;
