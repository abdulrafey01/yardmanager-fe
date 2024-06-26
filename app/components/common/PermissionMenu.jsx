import React, { useEffect } from "react";
import DownArrowIcon from "../../assets/main/39-downarrow.svg";
import UpArrowIcon from "../../assets/main/41-uparrow.svg";
import Image from "next/image";
import GreenToggle from "./GreenToggle";
import { useSelector } from "react-redux";
const PermissionMenu = ({ title }) => {
  const { showSideRoleMenu } = useSelector((state) => state.roles);
  useEffect(() => {
    setOpenPermissionDetail(false);
  }, [showSideRoleMenu]);

  const [openPermissionDetail, setOpenPermissionDetail] = React.useState(false);
  return (
    <div className="border-b-2 p-6 border-gray-100 flex flex-col  space-y-8  w-full ">
      <div className="flex justify-between  w-full items-center">
        <GreenToggle title={title} />
        {openPermissionDetail ? (
          <Image
            onClick={() => setOpenPermissionDetail(false)}
            src={UpArrowIcon}
            alt="UpArrowIcon"
            className="cursor-pointer"
          />
        ) : (
          <Image
            onClick={() => setOpenPermissionDetail(true)}
            src={DownArrowIcon}
            alt="DownArrowIcon"
            className="cursor-pointer"
          />
        )}
      </div>
      <div
        className={`${
          openPermissionDetail ? "grid" : "hidden"
        }  grid-cols-4 gap-y-4 `}
      >
        {/* Checkbox */}
        <div className="bg-white flex justify-start items-center rounded-sm  border-gray-100 space-x-3">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 outline-none accent-[#78ffb6]  "
          />
          <p>View</p>
        </div>
        {/* Checkbox */}
        <div className="bg-white flex justify-start items-center rounded-sm  border-white space-x-3">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
          />
          <p>Add</p>
        </div>
        {/* Checkbox */}
        <div className="bg-white flex justify-start items-center rounded-sm  border-white space-x-3">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
          />
          <p>Edit</p>
        </div>
        {/* Checkbox */}
        <div className="bg-white flex justify-start items-center rounded-sm  border-white space-x-3">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
          />
          <p>Delete</p>
        </div>
        {title === "Employees" && (
          <div className="bg-white w-36 flex justify-start items-center rounded-sm  border-white space-x-3">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
            />
            <p>Change Role</p>
          </div>
        )}
        {title === "Invoices" && (
          <div className="bg-white w-36 flex justify-start items-center rounded-sm  border-white space-x-3">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
            />
            <p>Change Status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionMenu;
