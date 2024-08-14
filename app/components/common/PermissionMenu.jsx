import React, { useEffect } from "react";
import DownArrowIcon from "../../assets/main/39-downarrow.svg";
import UpArrowIcon from "../../assets/main/41-uparrow.svg";
import Image from "next/image";
import GreenToggle from "./GreenToggle";
import { useSelector } from "react-redux";
const PermissionMenu = ({ title, perm, setPerm }) => {
  const { showSideMenu } = useSelector((state) => state.shared);

  useEffect(() => {
    setOpenPermissionDetail(false);
  }, [showSideMenu]);

  const [openPermissionDetail, setOpenPermissionDetail] = React.useState(false);

  // If permission detail menu is closed, reset permission
  useEffect(() => {
    if (!openPermissionDetail) {
      setPerm({ read: false, write: false, update: false, delete: false });
    }
  }, [openPermissionDetail]);

  // For edit mode: if any of the perm is true, keep permission detail menu open
  useEffect(() => {
    if (perm.read || perm.write || perm.update || perm.delete) {
      setOpenPermissionDetail(true);
    }
  }, [perm]);

  // On checkbox change
  const onCheckboxChange = (e) => {
    if (e.target.name === "write") {
      setPerm({
        ...perm,
        write: e.target.checked,
        update: e.target.checked,
        delete: e.target.checked,
      });
    } else if (e.target.name === "read") {
      // if cannot read then also cannot do anything else
      if (e.target.checked === false) {
        setPerm({ read: false, write: false, update: false, delete: false });
      } else {
        setPerm({ ...perm, [e.target.name]: e.target.checked });
      }
    } else {
      setPerm({ ...perm, [e.target.name]: e.target.checked });
    }
  };
  return (
    <div className="border-b-2 p-6 border-gray-100 flex flex-col  space-y-8  w-full ">
      <div className="flex justify-between  w-full items-center">
        <GreenToggle
          onChange={() => setOpenPermissionDetail(!openPermissionDetail)}
          checked={openPermissionDetail}
          title={title}
        />
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
        {title === "Deleted Items" ? (
          <>
            <div
              className={`bg-white flex justify-start items-center rounded-sm  border-gray-100 space-x-3`}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]  "
                onChange={onCheckboxChange}
                name="read"
                checked={perm.read}
              />
              <p>View</p>
            </div>
            <div
              className={`bg-white flex justify-start items-center rounded-sm  border-gray-100 space-x-3 ${
                perm.read ? "flex" : "hidden"
              }`}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]  "
                onChange={onCheckboxChange}
                name="write"
                checked={perm.write}
              />
              <p>Restore</p>
            </div>
            <div
              className={`bg-white ml-8 flex justify-start items-center rounded-sm  border-gray-100 space-x-3 ${
                perm.read ? "flex" : "hidden"
              }`}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]  "
                onChange={onCheckboxChange}
                name="delete"
                checked={perm.delete}
              />
              <p>Delete</p>
            </div>
          </>
        ) : (
          <>
            {/* Checkbox */}
            <div
              className={`bg-white flex justify-start items-center rounded-sm  border-gray-100 space-x-3 `}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]  "
                onChange={onCheckboxChange}
                name="read"
                checked={perm.read}
              />
              <p>View</p>
            </div>
            {/* Checkbox */}
            <div
              className={`bg-white  justify-start items-center rounded-sm  border-white space-x-3  ${
                perm.read ? "flex" : "hidden"
              }`}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
                onChange={onCheckboxChange}
                checked={perm.write}
                name="write"
              />
              <p>Add</p>
            </div>
            {/* Checkbox */}
            <div
              className={`bg-white  justify-start items-center rounded-sm  border-white space-x-3  ${
                perm.read ? "flex" : "hidden"
              }`}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
                name="update"
                checked={perm.update}
                onChange={onCheckboxChange}
              />
              <p>Edit</p>
            </div>
            {/* Checkbox */}
            <div
              className={`bg-white  justify-start items-center rounded-sm  border-white space-x-3  ${
                perm.read ? "flex" : "hidden"
              }`}
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
                name="delete"
                checked={perm.delete}
                onChange={onCheckboxChange}
              />
              <p>Delete</p>
            </div>
          </>
        )}
        {/* {title === "Employees" && (
          <div className="bg-white w-36 flex justify-start items-center rounded-sm  border-white space-x-3">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
            />
            <p>Change Role</p>
          </div>
        )} */}
        {/* {title === "Invoices" && (
          <div className="bg-white w-36 flex justify-start items-center rounded-sm  border-white space-x-3">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 outline-none accent-[#78ffb6]"
            />
            <p>Change Status</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PermissionMenu;
