"use client";

import SearchIcon from "../../../assets/main/30-search.svg";
import React, { useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import MenuIcon from "../../../assets/main/59-menu.svg";
import InvIcon from "../../../assets/main/60-inv.svg";
import VhcIcon from "../../../assets/main/61-hc.svg";
import InvoiceIcon from "../../../assets/main/62-invo.svg";
import EmpIcon from "../../../assets/main/63-emp.svg";
import ArrowIcon from "../../../assets/main/28-downarrow.svg";

import CountBlock from "../../../components/dashboard/CountBlock";
import BarChart from "../../../components/dashboard/BarChart";
import {
  setCurrentPage,
  setShowToast,
} from "../../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import { calcTotalPage, displayData } from "../../../helpers/pagination";
import { fetchInvoicesByPage } from "../../../../lib/features/invoice/invoiceActions";
import { useRouter } from "next/navigation";
import {
  fetchCounts,
  fetchInventoryCounts,
  fetchPartCounts,
} from "../../../../lib/features/dashboard/dashboardActions";
import axios from "axios";
import { getCookie } from "../../../helpers/storage";
import { resetToast } from "../../../../lib/features/dashboard/dashboardSlice";
import Footer from "../../../components/common/Footer";
import { resetInvoiceToast } from "../../../../lib/features/invoice/invoiceSlice";
const montserrat = Montserrat({ subsets: ["latin"] });

const page = () => {
  const {
    error,
    invoiceData,
    totalDataLength,
    toastMsg: invoiceToast,
  } = useSelector((state) => state.invoice);

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
    dispatch(setCurrentPage("Dashboard"));
    dispatch(fetchInvoicesByPage({ page: pageNumber, limit: dataLimit }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    dispatch(fetchInventoryCounts());
    dispatch(fetchPartCounts());
  }, []);

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
          (privilege) => privilege.name === "invoices"
        )?.permissions
      );
    }
    // console.log(user);
  }, [user]);

  const handleRadioClick = (e) => {
    if (e.target.value == 20) {
      dispatch(fetchInvoicesByPage({ page: 1, limit: 20 }));
      setDataLimit(20);
    } else if (e.target.value == 30) {
      dispatch(fetchInvoicesByPage({ page: 1, limit: 30 }));
      setDataLimit(30);
    } else {
      dispatch(fetchInvoicesByPage({ page: 1, limit: 10 }));
      setDataLimit(10);
    }
  };
  useEffect(() => {
    if (invoiceToast) {
      dispatch(setShowToast({ value: true, ...invoiceToast }));
    }
    dispatch(resetInvoiceToast());
  }, [invoiceToast]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("fetching data");
      let token = await getCookie("token");
      // console.log(state);
      // console.log(token);
      axios
        .get("https://yardmanager-be.vercel.app/api/analytics/count", {
          headers: { Authorization: `Bearer ${token}` },
        })
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
      // console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (dsbdError) {
      // console.log(dsbdError);
    }
  }, [dsbdError]);

  useEffect(() => {
    // When invoice data has come set total pages
    if (invoiceData) {
      setDataFromServer(invoiceData);
      let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      setTotalPage(totalPage);
    }
  }, [invoiceData, dataLimit]);
  // If clicked on edit or preview button  of action menu then redirect to create page
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      router.push(`/invoices/create`);
    }
  }, [showSideMenu]);

  // Search function
  const handleSearch = (e) => {
    dispatch(fetchInvoicesByPage({ search: e.target.value }));
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
            AI Auto Parts
          </p>
          {/* <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
            <p>Filter</p>
            <Image src={MenuIcon} alt="MenuIcon" />
          </div> */}
        </div>
        {/* 4 BLocks container */}
        <div className="flex w-full justify-between items-center gap-5 flex-wrap">
          <CountBlock
            title={"Inventory Added"}
            icon={InvIcon}
            count={data?.inventories ?? 0}
          />
          <CountBlock title={"Parts"} icon={VhcIcon} count={data?.parts ?? 0} />
          <CountBlock
            title={"Locations"}
            icon={InvoiceIcon}
            count={data?.locations ?? 0}
          />
          <CountBlock
            title={"Employees"}
            icon={EmpIcon}
            count={data?.employees ?? 0}
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
              <p className="font-bold text-lg">Vehicles Added</p>
              {/* Time select input */}
              <div
                onClick={() => {
                  setShowGraphFilter1(!showGraphFilter1);
                }}
                className="p-2 relative cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3"
              >
                <p>{filterValue1}</p>
                <Image src={ArrowIcon} alt="ArrowIcon" />
                <div
                  className={`absolute top-12 bg-white rounded-lg p-2 right-0 w-full border border-black ${
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
                      setFilterValue1("Yearly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Yearly
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
                      setFilterValue1("Weekly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Weekly
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
              <p className="font-bold text-lg">Parts Inventoried</p>
              {/* Time select input */}
              <div
                onClick={() => setShowGraphFilter2(!showGraphFilter2)}
                className="p-2 relative cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3"
              >
                <p>{filterValue2}</p>
                <Image src={ArrowIcon} alt="ArrowIcon" />
                <div
                  className={`absolute top-12 bg-white rounded-lg p-2 right-0 w-full border border-black ${
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
                      setFilterValue2("Yearly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Yearly
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
                      setFilterValue2("Weekly");
                    }}
                    className="p-1 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Weekly
                  </p>
                </div>
              </div>
            </div>
            {/* Chart */}
            <BarChart
              label={"Parts"}
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
        <div className="p-4 w-full gap-2 rounded-t-lg flex justify-between items-center">
          <p className="hidden sm:block font-bold text-lg md:text-2xl">
            Invoices List
          </p>
          <p className="sm:hidden font-bold text-lg md:text-2xl">Invoices</p>
          {/* Search abd filter input container*/}
          <div className="flex  space-x-2 sm:space-x-4">
            <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
              <Image src={SearchIcon} alt="SearchIcon" />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none bg-transparent"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {/* Table Container */}
        <div className=" overflow-x-auto sm:overflow-visible">
          {/* Head */}
          <TableHead
            titles={[
              "Name",
              "ID",
              "Email",
              "Phone",
              "Amount",
              "Date",
              "Status",
            ]}
          />
          {/* Body */}
          {dataFromServer.map((data, index) => (
            <TableRow
              titles={[
                data.name,
                data._id,
                data.email,
                data.phone,
                data.paid,
                new Date(data.datePaid).toLocaleDateString(),
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
  );
};

export default page;
