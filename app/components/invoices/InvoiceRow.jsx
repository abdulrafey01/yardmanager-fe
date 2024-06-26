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
    <tr className="border  relative border-[#EDEEF2] even:bg-[#fbfbfb] bg-white">
      <td onClick={() => setShowMenu(-1)} className=" p-3 text-left">
        {name}
      </td>
      <td onClick={() => setShowMenu(-1)} className=" p-3 text-left">
        {id}
      </td>
      <td onClick={() => setShowMenu(-1)} className=" p-3 text-left">
        {email}
      </td>
      <td onClick={() => setShowMenu(-1)} className=" p-3 text-left">
        {phone}
      </td>
      <td onClick={() => setShowMenu(-1)} className=" p-3   text-left">
        {amount}
      </td>
      <td onClick={() => setShowMenu(-1)} className=" p-3 text-left">
        {date}
      </td>
      <td onClick={() => setShowMenu(-1)} className=" p-3 text-left">
        <Badge received={status === "Received"} />
      </td>
      <td className=" p-3 relative  flex justify-center   ">
        <div className="absolute top-8 md:top-4">
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
        </div>
      </td>
    </tr>
  );
};

export default InvoiceRow;
