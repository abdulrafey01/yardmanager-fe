"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../../abstracts/GreenBtn";
import SearchIcon from "../../../assets/main/30-search.svg";
import MenuIcon from "../../../assets/main/37-menu.svg";
import { calcTotalPage, displayData } from "../../../helpers/pagination";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import "../../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../lib/features/shared/sharedSlice";
import {
  fetchEmployeesByPage,
  searchEmployeeByName,
} from "../../../../lib/features/employee/employeeActions";
import { resetEmpToast } from "../../../../lib/features/employee/employeeSlice";
import Footer from "../../../components/common/Footer";

const page = () => {
  const { error, employeeData, toastMsg, totalDataLength, employeeSearchData } =
    useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);

  const dispatch = useDispatch();
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [filterActive, setFilterActive] = React.useState(undefined);
  const [dataLimit, setDataLimit] = React.useState(10);

  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "user") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
      setPagePermission(
        user.data.role.privileges.find(
          (privilege) => privilege.name === "employees"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(pagePermission);
  }, [pagePermission]);

  useEffect(() => {
    dispatch(setCurrentPage("Employee"));
    dispatch(fetchEmployeesByPage({ page: pageNumber, limit: dataLimit }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When employee data has come set total pages
    if (employeeData) {
      setDataFromServer(employeeData);
      // console.log(employeeData);
      let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      setTotalPage(totalPage);
      console.log(employeeData);
    }
  }, [error, employeeData, dataLimit]);

  useEffect(() => {
    if (toastMsg) {
      dispatch(setShowToast({ value: true, ...toastMsg }));
      dispatch(resetEmpToast());
    }
  }, [toastMsg]);

  // Search function
  const handleSearch = (e) => {
    dispatch(fetchEmployeesByPage({ search: e.target.value }));
  };

  const handleRadioClick = (e) => {
    if (e.target.value == 20) {
      dispatch(
        fetchEmployeesByPage({ page: 1, limit: 20, filter: filterActive })
      );
      setDataLimit(20);
    } else if (e.target.value == 30) {
      dispatch(
        fetchEmployeesByPage({ page: 1, limit: 30, filter: filterActive })
      );
      setDataLimit(30);
    } else {
      dispatch(
        fetchEmployeesByPage({ page: 1, limit: 10, filter: filterActive })
      );
      setDataLimit(10);
    }
  };
  const handleFilterClick = (e) => {
    if (e.target.value === "Active") {
      dispatch(
        fetchEmployeesByPage({
          page: pageNumber,
          limit: dataLimit,
          filter: true,
        })
      );
      setFilterActive(true);
    } else if (e.target.value === "InActive") {
      dispatch(
        fetchEmployeesByPage({
          page: pageNumber,
          limit: dataLimit,
          filter: false,
        })
      );
      setFilterActive(false);
    } else {
      // normal fetch for null
      dispatch(
        fetchEmployeesByPage({
          page: pageNumber,
          limit: dataLimit,
        })
      );
      setFilterActive(undefined);
    }
  };

  return (
    pagePermission?.read && (
      // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
      // pr-6 for small devices to make content away from scrollbar due to screen width
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        <div className="flex items-center justify-end space-x-4  w-full p-2">
          {/* Add Employee Button */}
          <GreenBtn
            onClick={() =>
              dispatch(setShowSideMenu({ value: true, mode: "add" }))
            }
            title={"Add Employee"}
          />
        </div>
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Employee List
            </p>
            <p className="sm:hidden font-bold text-lg md:text-2xl">Employees</p>
            {/* Search and Filter container */}
            <div className="flex relative space-x-2 sm:space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent"
                  onChange={handleSearch}
                />
              </div>
              <div
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowFilterMenu(false);
                  }, 200)
                }
                tabIndex={0}
                className="p-2 relative cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3"
              >
                <p>Filter</p>
                <Image src={MenuIcon} alt="MenuIcon" />
              </div>
              {/* Dropdown */}
              <div
                className={`${
                  showFilterMenu ? "block" : "hidden"
                } bg-white z-50 overflow-auto no-scrollbar absolute top- w-36 right-0 top-11  rounded-lg border border-gray-300 p-3 flex flex-col justify-start max-h-40`}
              >
                <label
                  htmlFor="active"
                  className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg "
                >
                  <input
                    id="active"
                    name="radio2"
                    type="radio"
                    value={"Active"}
                    onChange={handleFilterClick}
                  />{" "}
                  Active
                </label>{" "}
                <label
                  htmlFor="inactive"
                  onClick={() => {}}
                  className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                >
                  <input
                    id="inactive"
                    name="radio2"
                    type="radio"
                    value={"InActive"}
                    onChange={handleFilterClick}
                  />{" "}
                  InActive
                </label>
                <label
                  htmlFor="all"
                  onClick={() => {}}
                  className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                >
                  <input
                    id="all"
                    name="radio2"
                    type="radio"
                    value={"All"}
                    defaultChecked
                    onChange={handleFilterClick}
                  />{" "}
                  All
                </label>
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className=" overflow-x-auto sm:overflow-visible">
            {/* Head */}
            <TableHead
              titles={[
                "Sr.#",
                "Name",
                "Email Address",
                "Role",
                "Position",
                "Hire Date",
                "Status",
              ]}
            />
            {/* Body */}
            {dataFromServer.length == 0 && (
              <div className="text-center p-8 font-semibold">
                No Data Available
              </div>
            )}
            {dataFromServer.map((data, index) => (
              <TableRow
                titles={[
                  index + 1,
                  `${data.name.first} ${data.name.last}`,
                  data.email,
                  data.role.name,
                  data.position,
                  new Date(data.date).toLocaleDateString(),
                  data.status,
                ]}
                key={index}
                rowIndex={index}
                item={data}
                permissions={pagePermission}
              />
            ))}
          </div>
          {/* Footer */}
          <Footer
            totalPage={totalPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleRadioClick={handleRadioClick}
          />
        </div>
      </div>
    )
  );
};

export default page;
