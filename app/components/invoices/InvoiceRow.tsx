import React, { useEffect } from "react";
import Badge from "./Badge";
import MenuIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import InvoiceActionMenu from "./InvoiceActionMenu";

type Props = {
  name: string;
  id: string;
  email: string;
  phone: string;
  amount: string;
  date: string;
  status: string;
  index: number;
  showModal: number;
  setShowModal: React.Dispatch<React.SetStateAction<number>>;
};

const InvoiceRow = ({
  name,
  id,
  email,
  phone,
  amount,
  date,
  status,
  index,
  showModal,
  setShowModal,
}: Props) => {
  return (
    <tr className="border relative border-[#EDEEF2]">
      <td className=" p-3 text-left">{name}</td>
      <td className=" p-3 text-left">{id}</td>
      <td className=" p-3 text-left">{email}</td>
      <td className=" p-3 text-left">{phone}</td>
      <td className=" p-3 text-left">{amount}</td>
      <td className=" p-3 text-left">{date}</td>
      <td className=" p-3 text-left">
        <Badge received={status === "Received"} />
      </td>
      <td className=" py-4 flex justify-center items-center ">
        <Image
          onClick={() => {
            // if clicked on same row icon, close the modal else close all and open respective row icon
            if (showModal === index) {
              setShowModal(-1);
            } else {
              setShowModal(-1);
              setShowModal(index);
            }
          }}
          className="cursor-pointer"
          src={MenuIcon}
          alt="menu"
        />
      </td>
      {/* Action Menu Container */}
      <InvoiceActionMenu showModal={showModal} index={index} />
    </tr>
  );
};

export default InvoiceRow;
