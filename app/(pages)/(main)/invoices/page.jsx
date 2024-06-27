"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import PlusIcon from "../../../assets/main/29-plus.svg";
import SearchIcon from "../../../assets/main/30-search.svg";
import { useSelector } from "react-redux";
import InvoiceRow from "../../../components/invoices/InvoiceRow";
import { displayData } from "../../../helpers/pagination";
import TableHeadRow from "../../../components/common/TableHeadRow";
import TableDataRow from "../../../components/common/TableDataRow";

const page = () => {
  const dataFromServer = useSelector((state) => state.invoice.data);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataToShow, setDataToShow] = React.useState([]);
  const [showActionMenu, setShowActionMenu] = React.useState(-1);

  useEffect(() => {
    let { dataToShow, totalPage } = displayData(dataFromServer, pageNumber);
    setDataToShow(dataToShow);
    setTotalPage(totalPage);
  }, [dataFromServer, pageNumber]);

  return (
    <div className="p-4 bg-[#f9fafb] flex-1 flex flex-col space-y-4">
      {/* Title Container*/}
      <div className="flex items-center justify-between  w-full p-2">
        <p className="font-bold text-lg">Manage Invoices</p>
        {/* Create Button */}
        <div className="cursor-pointer bg-[#78FFB6] hover:bg-[#37fd93] p-3 text-left rounded-lg flex space-x-2">
          <p className="font-bold text-sm">Create Invoice</p>
          <Image src={PlusIcon} alt="arrowIcon" />
        </div>
      </div>
      {/* Table */}
      <div className=" border rounded-xl   border-gray-300 flex flex-col  w-screen md:w-full ">
        {/* Table Head */}
        <div className="p-4 w-full  rounded-t-lg flex justify-between items-center">
          <p className="hidden sm:block font-medium text-xl">Invoice List</p>

          <p className="sm:hidden font-bold text-lg md:text-2xl">Invoices</p>
          <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <Image src={SearchIcon} alt="SearchIcon" />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>
        {/* Table Body */}
        <div className=" bg-white overflow-x-auto ">
          <table className="table-auto w-full">
            <TableHeadRow
              titles={[
                "Name",
                "ID",
                "Email",
                "Phone",
                "Amount",
                "Date",
                "Status",
                "Action",
              ]}
            />
            <tbody className="text-sm w-full">
              {dataToShow.map((item, index) => (
                <InvoiceRow
                  name={item.name}
                  id={item.id}
                  email={item.email}
                  phone={item.phone}
                  amount={item.amount}
                  date={item.date}
                  status={item.status}
                  index={index}
                  showMenu={showActionMenu}
                  setShowMenu={setShowActionMenu}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="p-4 w-full rounded-b-lg flex justify-between items-center">
          <p className="font-semibold text-sm">
            Page {pageNumber} of {totalPage}
          </p>
          <div className="flex space-x-2">
            <div
              onClick={() =>
                setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1)
              }
              className="cursor-pointer select-none py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg"
            >
              Previous
            </div>
            <div
              onClick={() =>
                setPageNumber(
                  pageNumber === totalPage ? pageNumber : pageNumber + 1
                )
              }
              className="cursor-pointer select-none py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg"
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
