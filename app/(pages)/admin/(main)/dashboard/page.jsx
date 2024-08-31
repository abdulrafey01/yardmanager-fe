"use client";

import SearchIcon from "../../../../assets/main/30-search.svg";
import React, { useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import MenuIcon from "../../../../assets/main/59-menu.svg";
import UserIcon from "../../../../assets/main/83-user.svg";
import InvIcon from "../../../../assets/main/84-inv.svg";
import YardIcon from "../../../../assets/main/85-yard.svg";
import SubIcon from "../../../../assets/main/86-sub.svg";
import ArrowIcon from "../../../../assets/main/28-downarrow.svg";

import CountBlock from "../../../../components/dashboard/CountBlock";
import BarChart from "../../../../components/dashboard/BarChart";
import {
  setCurrentPage,
  setShowToast,
} from "../../../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../../components/common/TableHead";
import TableRow from "../../../../components/common/TableRow";
import { calcTotalPage, displayData } from "../../../../helpers/pagination";
import { fetchInvoicesByPage } from "../../../../../lib/features/invoice/invoiceActions";
import { useRouter } from "next/navigation";
import {
  fetchCounts,
  fetchInventoryCounts,
  fetchPartCounts,
} from "../../../../../lib/features/dashboard/dashboardActions";
import axios from "axios";
import { getCookie, getLocalStorage } from "../../../../helpers/storage";
import { resetToast } from "../../../../../lib/features/dashboard/dashboardSlice";
import Footer from "../../../../components/common/Footer";
import { resetInvoiceToast } from "../../../../../lib/features/invoice/invoiceSlice";
import { fetchSubscriptionsByPage } from "../../../../../lib/features/subscription/subscriptionActions";
const montserrat = Montserrat({ subsets: ["latin"] });

const page = () => {
  const {
    error,
    subscriptionData,
    toastMsg: subToast,
    totalDataLength,
  } = useSelector((state) => state.subscribe);
  const { user } = useSelector((state) => state.auth);
  const { showSideMenu } = useSelector((state) => state.shared);
  const {
    toastMsg,
    error: dsbdError,
    counts,
    inventoryGraphData,
    partsGraphData,
  } = useSelector((state) => state.dashboard);
  const router = useRouter();

  const dispatch = useDispatch();
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [data, setData] = React.useState({});
  const [inventoryMapData, setInventoryMapData] = React.useState({});
  const [inventoryGraphDates, setInventoryGraphDates] = React.useState([]);
  const [partMapData, setPartMapData] = React.useState({});
  const [partGraphdates, setPartGraphdates] = React.useState([]);
  const [dataLimit, setDataLimit] = React.useState(10);
  const [showGraphFilter1, setShowGraphFilter1] = React.useState(false);
  const [showGraphFilter2, setShowGraphFilter2] = React.useState(false);
  const [filterValue1, setFilterValue1] = React.useState("Yearly");
  const [filterValue2, setFilterValue2] = React.useState("Yearly");
  const [pagePermission, setPagePermission] = React.useState(null);
  useEffect(() => {
    dispatch(setCurrentPage("AdminDashboard"));
    dispatch(
      fetchSubscriptionsByPage({
        page: pageNumber,
        limit: dataLimit,
        isAdmin: true,
      })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    dispatch(fetchInventoryCounts({ isAdmin: true }));
    dispatch(fetchPartCounts({ isAdmin: true }));
  }, []);

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
    // console.log(user);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("fetching data");
      const token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
      // console.log(state);
      // console.log(token);
      axios
        .get(
          `https://yardmanager-be.vercel.app/api/analytics/count?division=company`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log("response");
          console.log("counts", res.data);
          setData(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inventoryGraphData) {
      console.log("inventory graph data", inventoryGraphData);

      let dateCountMap = new Map();

      for (let item of inventoryGraphData) {
        const dateKey =
          filterValue1 === "Daily"
            ? `${item.year}-${item.month}-${item.day}`
            : filterValue1 === "Monthly"
            ? `${item.year}-${item.month}`
            : filterValue1 === "Weekly"
            ? `${item.week}`
            : `${item.year}`;
        dateCountMap.set(
          dateKey,
          (dateCountMap.get(dateKey) || 0) + item.count
        );
      }

      let totalDaysData = Array.from(dateCountMap.values());
      let dates = Array.from(dateCountMap.keys());
      // console.log("dates", dates);
      setInventoryGraphDates(dates);

      // console.log(totalDaysData); // Output: [2, 1, 1]
      // console.log("totalDaysData", totalDaysData);
      // console.log("dateCountMap", dateCountMap);
      setInventoryMapData(totalDaysData);
    }
  }, [inventoryGraphData, filterValue1]);

  useEffect(() => {
    console.log("partsGraphData", partsGraphData);
  }, [partsGraphData]);
  useEffect(() => {
    if (partsGraphData) {
      console.log("partsgraphdata", partsGraphData);

      let dateCountMap = new Map();

      for (const item of partsGraphData) {
        const dateKey =
          filterValue2 === "Daily"
            ? `${item.year}-${item.month}-${item.day}`
            : filterValue2 === "Monthly"
            ? `${item.year}-${item.month}`
            : filterValue2 === "Weekly"
            ? `${item.week}`
            : `${item.year}`;
        dateCountMap.set(
          dateKey,
          (dateCountMap.get(dateKey) || 0) + item.count
        );
      }

      let totalDaysData = Array.from(dateCountMap.values());
      let dates = Array.from(dateCountMap.keys());
      console.log("dates", dates);
      setPartGraphdates(dates);

      console.log(totalDaysData); // Output: [2, 1, 1]
      console.log("totalDaysData", totalDaysData);
      console.log("dateCountMap", dateCountMap);
      setPartMapData(totalDaysData);
    }
  }, [partsGraphData, filterValue2]);

  // if is there to prevent render on page load
  useEffect(() => {
    if (toastMsg) {
      dispatch(setShowToast({ value: true, ...toastMsg }));
    }
    dispatch(resetToast());
  }, [toastMsg]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (dsbdError) {
      // console.log(dsbdError);
    }
  }, [dsbdError]);

  useEffect(() => {
    if (subscriptionData) {
      setDataFromServer(subscriptionData);
      // let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      if (totalDataLength) {
        setTotalPage(100);
      } else if (!totalDataLength) {
        setTotalPage(pageNumber);
      }
      console.log("subscriptionData", subscriptionData);
    }
  }, [subscriptionData, dataLimit]);
  // If clicked on edit or preview button  of action menu then redirect to create page
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      router.push(`/invoices/create`);
    }
  }, [showSideMenu]);

  const handleRadioClick = (e) => {
    if (e.target.value == 25) {
      dispatch(fetchSubscriptionsByPage({ page: 1, limit: 25, isAdmin: true }));
      setDataLimit(25);
      setPageNumber(1);
    } else if (e.target.value == 50) {
      dispatch(fetchSubscriptionsByPage({ page: 1, limit: 50, isAdmin: true }));
      setDataLimit(50);
      setPageNumber(1);
    } else {
      dispatch(fetchSubscriptionsByPage({ page: 1, limit: 10, isAdmin: true }));
      setDataLimit(10);
      setPageNumber(1);
    }
  };
  // Search function
  const handleSearch = (e) => {
    // dispatch(fetchInvoicesByPage({ search: e.target.value }));
  };
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-8 w-screen md:w-full ">
      {/* First container */}
      <div className="w-full bg-white flex flex-col items-start justify-start  p-4 rounded-xl gap-6 border border-gray-300">
        {/* Container for Text and filter btn */}
        <div className="flex justify-between items-center w-full">
          <p
            className={`font-bold text-base  ${montserrat.className} tracking-wider`}
          >
            Overall Summary
          </p>
          {/* <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
            <p>Filter</p>
            <Image src={MenuIcon} alt="MenuIcon" />
          </div> */}
        </div>
        {/* 4 BLocks container */}
        <div className="flex w-full justify-between items-center gap-5 flex-wrap">
          <CountBlock
            title={"Total Users"}
            icon={UserIcon}
            count={data?.yards ?? 0}
          />
          <CountBlock
            title={"Total Inventory"}
            icon={InvIcon}
            count={data?.inventories ?? 0}
          />
          <CountBlock
            title={"Total Yards"}
            icon={YardIcon}
            count={data?.yards ?? 0}
          />
          <CountBlock
            title={"Total Locations"}
            icon={SubIcon}
            count={data?.locations ?? 0}
          />
        </div>
      </div>
      {/* Container of 2 charts */}
      <div className="w-full flex-col md:flex-row flex justify-center items-center gap-4">
        <div className="w-full p-4 rounded-xl border border-gray-300 bg-white">
          {/* First Chart */}
          <div className="w-full flex-col  max-h-80 pb-4  flex items-center justify-between">
            {/* Text and input container */}
            <div className="w-full flex items-center justify-between">
              <p className="font-bold text-lg">Total Inventory</p>
              {/* Time select input */}
              <div
                onClick={() => {
                  setShowGraphFilter1(!showGraphFilter1);
                }}
                tabIndex={0}
                onBlur={() => {
                  setTimeout(() => {
                    setShowGraphFilter1(false);
                  }, 200);
                }}
                className="p-2 relative cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3"
              >
                <p>{filterValue1}</p>
                <Image src={ArrowIcon} alt="ArrowIcon" />
                <div
                  className={`absolute top-12 bg-white rounded-lg p-2 right-0 w-[110%] border border-black ${
                    showGraphFilter1 ? "block" : "hidden"
                  }`}
                >
                  <p
                    onClick={() => {
                      setFilterValue1("Daily");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Daily
                  </p>
                  <p
                    onClick={() => {
                      setFilterValue1("Weekly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Weekly
                  </p>

                  <p
                    onClick={() => {
                      setFilterValue1("Monthly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Monthly
                  </p>
                  <p
                    onClick={() => {
                      setFilterValue1("Yearly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Yearly
                  </p>
                </div>
              </div>
            </div>
            {/* Chart */}
            <BarChart
              label={"Inventory"}
              xLabels={inventoryGraphDates}
              data={inventoryMapData}
              greenColor={true}
            />
          </div>
        </div>
        <div className="w-full p-4 rounded-xl border border-gray-300 bg-white">
          {/* Second Chart Container*/}

          <div className="w-full flex-col  max-h-80 pb-4  flex items-center justify-between">
            {/* Text and input container */}
            <div className="w-full flex items-center justify-between">
              <p className="font-bold text-lg">Total Users</p>
              {/* Time select input */}
              <div
                onClick={() => setShowGraphFilter2(!showGraphFilter2)}
                tabIndex={0}
                onBlur={() => {
                  setTimeout(() => {
                    setShowGraphFilter2(false);
                  }, 200);
                }}
                className="p-2 relative cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3"
              >
                <p>{filterValue2}</p>
                <Image src={ArrowIcon} alt="ArrowIcon" />
                <div
                  className={`absolute top-12 bg-white rounded-lg p-2 right-0 w-[110%] border border-black ${
                    showGraphFilter2 ? "block" : "hidden"
                  }`}
                >
                  <p
                    onClick={() => {
                      setFilterValue2("Daily");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Daily
                  </p>
                  <p
                    onClick={() => {
                      setFilterValue2("Weekly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Weekly
                  </p>
                  <p
                    onClick={() => {
                      setFilterValue2("Monthly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Monthly
                  </p>
                  <p
                    onClick={() => {
                      setFilterValue2("Yearly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Yearly
                  </p>
                </div>
              </div>
            </div>
            {/* Chart */}
            <BarChart
              label={"Users"}
              xLabels={partGraphdates}
              data={partMapData}
              greenColor={false}
            />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className=" border rounded-xl border-gray-300 flex flex-col">
        {/* Table Title container */}
        <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
          <p className="hidden sm:block font-bold text-lg md:text-2xl">
            Subscription
          </p>
          <p className="sm:hidden font-bold text-lg md:text-2xl">
            Subscriptions
          </p>
          {/* Search and filter input container
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
            </div> */}
        </div>
        {/* Table Container */}
        <div className=" overflow-x-auto sm:overflow-visible">
          {/* Head */}
          <TableHead
            titles={[
              "Sr.#",
              "Name",
              "Subscription Plan",
              "Start Date",
              "Renewal Date",
              "Status",
            ]}
          />
          {/* Body */}
          {dataFromServer?.map((currentSubscription, index) => (
            <TableRow
              key={index}
              titles={[
                index + 1,
                currentSubscription?.user?.name?.first +
                  " " +
                  currentSubscription?.user?.name?.last,
                currentSubscription?.plan?.interval === "month"
                  ? "Monthly"
                  : "Yearly",
                new Date(
                  currentSubscription?.current_period_start * 1000
                ).toLocaleDateString(),
                new Date(
                  currentSubscription?.current_period_end * 1000
                ).toLocaleDateString(),
                currentSubscription?.plan?.active === true
                  ? "Active"
                  : "Inactive",
              ]}
              rowIndex={index}
              item={currentSubscription}
            />
          ))}
        </div>
        {/* Footer */}
        <Footer
          totalPage={totalPage}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          handleRadioClick={handleRadioClick}
          isSubscriptionOverview={true}
        />
      </div>
    </div>
  );
};

export default page;
