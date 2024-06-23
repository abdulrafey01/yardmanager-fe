"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import PlusIcon from "../../../assets/main/29-plus.svg";
import SearchIcon from "../../../assets/main/30-search.svg";
import InvoiceRow from "@/app/components/invoices/InvoiceRow";

type Props = {};

const page = (props: Props) => {
  const data = [
    {
      name: "Shahid",
      id: "7826274843",
      email: "shahid@example.com",
      phone: "123-456-7890",
      amount: "$272789",
      date: "24/04/2024",
      status: "Received",
    },
    {
      name: "Raja Noraiz",
      id: "7826274844",
      email: "noriazraja2121@gmail.com",
      phone: "234-567-8901",
      amount: "$272789",
      date: "24/04/2024",
      status: "Pending",
    },
    {
      name: "Alice Johnson",
      id: "7826274845",
      email: "alice.johnson@example.com",
      phone: "345-678-9012",
      amount: "$152340",
      date: "25/04/2024",
      status: "Received",
    },
    {
      name: "Bob Smith",
      id: "7826274846",
      email: "bob.smith@example.com",
      phone: "456-789-0123",
      amount: "$450600",
      date: "26/04/2024",
      status: "Pending",
    },
    {
      name: "Carol White",
      id: "7826274847",
      email: "carol.white@example.com",
      phone: "567-890-1234",
      amount: "$783200",
      date: "27/04/2024",
      status: "Received",
    },
    // Add more objects as needed
  ];

  const displayData = (data: any, pageNumber: any) => {
    // Total Length
    let dataLength = data.length;
    console.log(dataLength);
    //  Max to Display on singple page
    let maxData = 2;
    // Start index to display data
    let dataStart = (pageNumber - 1) * maxData;
    if (dataLength > maxData) {
      let newData = data.slice(dataStart, maxData + dataStart);
      console.log(newData);
    }
    // Total Number of pages
    let totalPage = Math.ceil(dataLength / maxData);
  };

  useEffect(() => {
    displayData(data, 2);
  }, []);
  return (
    <div className="p-4 bg-[#f9fafb] flex-1 flex flex-col space-y-4">
      {/* Title Container*/}
      <div className="flex items-center justify-between  w-full p-2">
        <p className="font-bold text-lg">Manage Invoices</p>
        {/* Create Button */}
        <div className="bg-[#78FFB6] p-3 text-left rounded-lg flex space-x-2">
          <p className="font-bold text-sm">Create Invoice</p>
          <Image src={PlusIcon} alt="arrowIcon" />
        </div>
      </div>
      {/* Table */}
      <div className=" flex-1 bg-white  border rounded-xl border-gray-300 flex flex-col">
        {/* Table Head */}
        <div className="p-4 w-full rounded-t-lg flex justify-between items-center">
          <p className="font-medium text-xl">Invoice List</p>
          <div className="flex p-2 w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <Image src={SearchIcon} alt="SearchIcon" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none"
            />
          </div>
        </div>
        {/* Table Body */}
        <div className="bg-white">
          <table className="table-auto w-full ">
            <thead className="bg-[#f2fff8] border border-[#EDEEF2] text-sm">
              <tr>
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Invoice #</th>
                <th className="p-3 text-left">Customer Name</th>
                <th className="p-3 text-left">Email Address</th>
                <th className="p-3 text-left">Grand Total</th>
                <th className="p-3 text-left">Order Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm w-full">
              {data.map((item, index) => (
                <InvoiceRow
                  name={item.name}
                  id={item.id}
                  email={item.email}
                  phone={item.phone}
                  amount={item.amount}
                  date={item.date}
                  status={item.status}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
