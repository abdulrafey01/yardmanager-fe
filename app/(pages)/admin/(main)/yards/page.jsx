"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../../../abstracts/GreenBtn";
import SearchIcon from "../../../../assets/main/30-search.svg";
import MenuIcon from "../../../../assets/main/37-menu.svg";
import { calcTotalPage } from "../../../../helpers/pagination";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../../components/common/TableHead";
import TableRow from "../../../../components/common/TableRow";
import "../../../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../../lib/features/shared/sharedSlice";
import {
  fetchAllLocations,
  fetchLocationsByPage,
  searchLocationByName,
} from "../../../../../lib/features/locations/locationActions";
import Footer from "../../../../components/common/Footer";
import { resetLocToast } from "../../../../../lib/features/locations/locationSlice";
import { getYardsByPage } from "../../../../../lib/adminApis/yardApi";
import { removeLocalStorage } from "../../../../helpers/storage";

const LocationPage = () => {
  // const { error, locationData, toastMsg, totalDataLength, locationSearchData } =
  //   useSelector((state) => state.locations);

  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);
  const dispatch = useDispatch();
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const [dataLimit, setDataLimit] = React.useState(10);
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const refreshYardData = async () => {
    setSearchInputValue("");
    try {
      const res = await getYardsByPage({
        page: pageNumber,
        limit: dataLimit,
      });
      if (res.success) {
        setDataFromServer(res.data);
        let { totalPage } = calcTotalPage(res.meta.total, dataLimit);
        setTotalPage(totalPage);
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(setCurrentPage("Yards"));
    refreshYardData();
  }, [dispatch, pageNumber]);
  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "admin") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
    }
    console.log(user);
  }, [user]);

  // Clean old data
  useEffect(() => {
    removeLocalStorage("companyId");
  }, []);

  // Search function
  const handleSearch = (e) => {
    setPageNumber(1);
    setSearchInputValue(e.target.value);
    getYardsByPage({ search: e.target.value }).then((res) => {
      setDataFromServer(res.data);
    });
  };

  const handleRadioClick = (e) => {
    if (e.target.value == 20) {
      getYardsByPage({ page: 1, limit: 20 }).then((res) => {
        setDataFromServer(res.data);
      });
      setDataLimit(20);
      setPageNumber(1);
    } else if (e.target.value == 30) {
      getYardsByPage({ page: 1, limit: 30 }).then((res) => {
        setDataFromServer(res.data);
      });
      setDataLimit(30);
      setPageNumber(1);
    } else {
      getYardsByPage({ page: 1, limit: 10 }).then((res) => {
        setDataFromServer(res.data);
      });
      setDataLimit(10);
      setPageNumber(1);
    }
    setSearchInputValue("");
  };
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        <div className="flex items-center justify-end space-x-4  w-full p-2">
          {/* Add Location Button */}
          <GreenBtn
            onClick={() =>
              dispatch(setShowSideMenu({ value: true, mode: "add" }))
            }
            title={"Add New Yard"}
          />
        </div>
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Yards List
            </p>
            <p className="sm:hidden font-bold text-lg md:text-2xl">Yards</p>
            {/* Search and filter input container */}
            <div className="flex space-x-2 sm:space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent"
                  value={searchInputValue}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className="overflow-visible">
            {/* Head */}
            <TableHead
              titles={["Sr.#", "Yard Name", "Email", "Number of items", "Date"]}
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
                  data.name,
                  data.owner.email,
                  data?.countInventory,
                  new Date(data.createdAt).toLocaleDateString(),
                ]}
                key={index}
                rowIndex={index}
                item={data}
                permissions={pagePermission}
                refreshYardData={refreshYardData}
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

export default LocationPage;
