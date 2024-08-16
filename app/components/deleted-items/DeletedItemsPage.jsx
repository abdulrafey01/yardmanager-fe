"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GreenBtn from "../../abstracts/GreenBtn";
import SearchIcon from "../../assets/main/30-search.svg";
import MenuIcon from "../../assets/main/37-menu.svg";
import { calcTotalPage, displayData } from "../../helpers/pagination";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../components/common/TableHead";
import TableRow from "../../components/common/TableRow";
import "../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import { fetchDeletedItemsByPage } from "../../../lib/features/deleted-items/deletedItemsActions";
import Footer from "../../components/common/Footer";
import axios from "axios";
import { getCookie } from "../../helpers/storage";
import { resetDelToast } from "../../../lib/features/deleted-items/deletedItemsSlice";

const DeletedItemsPage = ({ isAdmin = false }) => {
  const { error, deletedItemsData, toastMsg, totalDataLength } = useSelector(
    (state) => state.deletedItems
  );
  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);
  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "user" || user.userType === "admin") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
      setPagePermission(
        user.data.role.privileges.find(
          (privilege) => privilege.name === "recycled"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState([]);

  const [dataLimit, setDataLimit] = React.useState(10);

  useEffect(() => {
    dispatch(setCurrentPage("DeletedItems"));
    dispatch(
      fetchDeletedItemsByPage({ page: pageNumber, limit: dataLimit, isAdmin })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    // When deleted data has come, set total pages
    if (deletedItemsData) {
      setDataFromServer(deletedItemsData);
      let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      setTotalPage(totalPage);
    }
  }, [deletedItemsData, dataLimit]);

  useEffect(() => {
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, ...toastMsg }));
        dispatch(resetDelToast());
      }
    }
  }, [toastMsg]);

  // Search function
  const handleSearch = (e) => {
    setPageNumber(1);

    dispatch(fetchDeletedItemsByPage({ search: e.target.value, isAdmin }));
  };

  const handleRadioClick = (e) => {
    if (e.target.value == 25) {
      dispatch(fetchDeletedItemsByPage({ page: 1, limit: 25, isAdmin }));
      setDataLimit(25);
      setPageNumber(1);
    } else if (e.target.value == 50) {
      dispatch(fetchDeletedItemsByPage({ page: 1, limit: 50, isAdmin }));
      setDataLimit(50);
      setPageNumber(1);
    } else {
      dispatch(fetchDeletedItemsByPage({ page: 1, limit: 10, isAdmin }));
      setDataLimit(10);
      setPageNumber(1);
    }
  };

  const deleteAll = async () => {
    try {
      let token;
      let companyId;

      // role based token
      if (isAdmin) {
        token =
          getCookie("adminToken") ||
          window?.sessionStorage.getItem("adminToken");
        companyId = JSON.parse(localStorage.getItem("companyId"));
      } else {
        token = getCookie("token") || window?.sessionStorage.getItem("token");
      }
      const response = await axios.delete(
        `https://yardmanager-be.vercel.app/api/inventory/all${
          isAdmin ? `?company=${companyId}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(setShowToast({ value: true, msg: response.data.message }));
      setDataFromServer([]);

      dispatch(
        fetchDeletedItemsByPage({ page: pageNumber, limit: dataLimit, isAdmin })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setShowToast({
          value: true,
          msg: error.response.data.message,
          red: true,
        })
      );
    }
  };

  // on Close menu if no error
  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(fetchDeletedItemsByPage({ page: 1, limit: dataLimit, isAdmin }));
      setPageNumber(1);
    }
  }, [toastMsg]);
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-2 sm:p-4 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Deleted Items
            </p>
            <p className="sm:hidden text-center font-bold text-xs md:text-2xl px-1">
              Deleted Items
            </p>
            {/* Search input */}
            <div className="flex  space-x-1 sm:space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent"
                  onChange={handleSearch}
                />
              </div>
              {/* Filter Button */}
              {/* <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center  sm:space-x-3">
                <p>Filter</p>
                <Image src={MenuIcon} alt="MenuIcon" />
              </div> */}
              <div
                onClick={deleteAll}
                className="p-1 sm:p-3 cursor-pointer hover:bg-red-700 border bg-[#D32F2F] text-white border-gray-300 rounded-lg flex justify-between items-center text-xs sm:text-sm text-center"
              >
                <p>Clear All</p>
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className=" overflow-x-auto sm:overflow-visible">
            {/* Head */}
            <TableHead
              titles={["SKU", "Part", "Year", "Model", "Make", "Variant"]}
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
                  data.sku,
                  data.part?.name,
                  `${new Date(data.startYear).getFullYear()} - ${new Date(
                    data.lastYear
                  ).getFullYear()}`,
                  data.model,
                  data.make,
                  data.variant,
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

export default DeletedItemsPage;
