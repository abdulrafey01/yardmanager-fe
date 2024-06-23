import React from "react";
import Badge from "./Badge";

type Props = {
  name: string;
  id: string;
  email: string;
  phone: string;
  amount: string;
  date: string;
  status: string;
};

const InvoiceRow = ({
  name,
  id,
  email,
  phone,
  amount,
  date,
  status,
}: Props) => {
  return (
    <tr className="border border-[#EDEEF2]">
      <td className=" p-3 text-left">{name}</td>
      <td className=" p-3 text-left">{id}</td>
      <td className=" p-3 text-left">{email}</td>
      <td className=" p-3 text-left">{phone}</td>
      <td className=" p-3 text-left">{amount}</td>
      <td className=" p-3 text-left">{date}</td>
      <td className=" p-3 text-left">
        <Badge received={status === "Received"} />
      </td>
      <td className=" p-3 text-left">Action</td>
    </tr>
  );
};

export default InvoiceRow;
