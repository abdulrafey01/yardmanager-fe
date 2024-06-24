"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../../abstracts/GreenBtn";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import SearchIcon from "../../../assets/main/30-search.svg";
import MenuIcon from "../../../assets/main/37-menu.svg";
import TableHeadRow from "../../../components/common/TableHeadRow";
import RoleRow from "../../../components/roles/RoleRow";
import { displayData } from "../../../helpers/pagination";
import { useSelector } from "react-redux";
import TableDataRow from "../../../components/common/TableDataRow";

const page = () => {
  const dataFromServer = useSelector((state) => state.roles.rolesData);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const [dataToShow, setDataToShow] = React.useState([]);

  const [showActionMenu, setShowActionMenu] = React.useState(-1);
  useEffect(() => {
    let { dataToShow, totalPage } = displayData(dataFromServer, pageNumber);
    setDataToShow(dataToShow);
    setTotalPage(totalPage);
  }, [dataFromServer, pageNumber]);
  const { rolesData } = useSelector((state) => state.roles);
  return (
    <div className="p-4 bg-[#f9fafb] flex-1 flex flex-col space-y-4">
      <div className="flex items-center justify-end space-x-4  w-full p-2">
        {/* Create Role Button */}
        <WhiteBtn title={"Add Employee"} />
        <GreenBtn title={"Create New Role"} />
      </div>
      {/* Table */}
      <div className=" border rounded-xl border-gray-300 flex flex-col">
        {/* Table Title container */}
        <div className="p-4 w-full rounded-t-lg flex justify-between items-center">
          <p className="font-bold text-2xl">Roles & Permission List</p>
          {/* Search input */}
          <div className="flex  space-x-4">
            <div className="flex p-2 w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <Image src={SearchIcon} alt="SearchIcon" />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none"
              />
            </div>
            <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
              <p>Filter</p>
              <Image src={MenuIcon} alt="MenuIcon" />
            </div>
          </div>
        </div>
        {/* Table Container */}
        <div className="bg-white">
          <table className="table-auto w-full ">
            <TableHeadRow
              titles={["Sr #", "Role Name", "Employees", "Action"]}
            />
            <tbody className="text-sm w-full">
              {dataToShow.map((role, index) => (
                // <RoleRow
                //   key={index}
                //   index={index}
                //   role={role.roleName}
                //   employees={role.employees}
                //   showMenu={showActionMenu}
                //   setShowMenu={setShowActionMenu}
                // />
                <TableDataRow
                  titles={[role.roleName, role.employees]}
                  tableType={"roles"}
                  showMenu={showActionMenu}
                  setShowMenu={setShowActionMenu}
                  key={index}
                  index={index}
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
              className="cursor-pointer py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg"
            >
              Previous
            </div>
            <div
              onClick={() =>
                setPageNumber(
                  pageNumber === totalPage ? pageNumber : pageNumber + 1
                )
              }
              className="cursor-pointer py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg"
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
