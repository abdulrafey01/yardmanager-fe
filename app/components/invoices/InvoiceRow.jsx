import React, { useEffect } from "react";
import Badge from "./Badge";
import MenuIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import InvoiceActionMenu from "./InvoiceActionMenu";

const InvoiceRow = ({
  name,
  id,
  email,
  phone,
  amount,
  date,
  status,
  index,
  showMenu,
  setShowMenu,
}) => {
  return (
    <tr
      // On mouseleaving the row, close the action menu
      onMouseLeave={() => setShowMenu(-1)}
      className="border relative border-[#EDEEF2] even:bg-[#fbfbfb] bg-white"
    >
      <td className=" p-3 text-left">{name}</td>
      <td className=" p-3 text-left">{id}</td>
      <td className=" p-3 text-left">{email}</td>
      <td className=" p-3 text-left">{phone}</td>
      <td className=" p-3 text-left">{amount}</td>
      <td className=" p-3 text-left">{date}</td>
      <td className=" p-3 text-left">
        <Badge received={status === "Received"} />
      </td>
      <td className=" py-8  flex justify-center items-center ">
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
        <InvoiceActionMenu showActionMenu={showMenu} index={index} />
      </td>
    </tr>
  );
};

export default InvoiceRow;
