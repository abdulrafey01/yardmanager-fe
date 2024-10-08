"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GreenBtn from "../../../../abstracts/GreenBtn";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../../lib/features/shared/sharedSlice";

import SearchIcon from "../../../../assets/main/30-search.svg";
import TableHead from "../../../../components/common/TableHead";
import TableRow from "../../../../components/common/TableRow";
import { calcTotalPage } from "../../../../helpers/pagination";
import Image from "next/image";
import { fetchLocationsByPage } from "../../../../../lib/features/locations/locationActions";

import MenuIcon from "../../../../assets/main/37-menu.svg";
import { fetchYardsByPage } from "../../../../../lib/features/yards/yardActions";
import { fetchSubscriptionsByPage } from "../../../../../lib/features/subscription/subscriptionActions";
import Footer from "../../../../components/common/Footer";
import { resetSubscriptionToast } from "../../../../../lib/features/subscription/subscriptionSlice";
const Subscription = ({ isAdmin = false }) => {
  const { error, subscriptionData, toastMsg, totalDataLength } = useSelector(
    (state) => state.subscribe
  );

  const { user } = useSelector((state) => state.auth);

  const [pagePermission, setPagePermission] = React.useState(null);
  const dispatch = useDispatch();
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const [dataLimit, setDataLimit] = React.useState(10);
  const [searchInputValue, setSearchInputValue] = React.useState("");

  useEffect(() => {
    dispatch(setCurrentPage("SubscriptionAdmin"));
    dispatch(
      fetchSubscriptionsByPage({ page: pageNumber, limit: dataLimit, isAdmin })
    );
  }, [dispatch, pageNumber]);
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
          (privilege) => privilege.name === "subscription"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    // When location data has come set total pages
  }, [error]);

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

  useEffect(() => {
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, ...toastMsg }));
        dispatch(resetSubscriptionToast());
      }
    }
    console.log(toastMsg);
  }, [toastMsg]);
  // Search function
  const handleSearch = (e) => {
    setPageNumber(1);

    setSearchInputValue(e.target.value);
    dispatch(fetchSubscriptionsByPage({ search: e.target.value, isAdmin }));
  };

  const handleRadioClick = (e) => {
    if (e.target.value == 25) {
      dispatch(fetchSubscriptionsByPage({ page: 1, limit: 25, isAdmin }));
      setDataLimit(25);
      setPageNumber(1);
    } else if (e.target.value == 50) {
      dispatch(fetchSubscriptionsByPage({ page: 1, limit: 50, isAdmin }));
      setDataLimit(50);
      setPageNumber(1);
    } else {
      dispatch(fetchSubscriptionsByPage({ page: 1, limit: 10, isAdmin }));
      setDataLimit(10);
      setPageNumber(1);
    }
    setSearchInputValue("");
  };
  // on Close menu if no error
  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(
        fetchSubscriptionsByPage({ page: 1, limit: dataLimit, isAdmin })
      );
      setPageNumber(1);
    }
  }, [toastMsg]);
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        <div className="flex items-center justify-end space-x-4  w-full p-2">
          {/* Add Subscription Button */}
          <GreenBtn
            onClick={() =>
              dispatch(setShowSideMenu({ value: true, mode: "add" }))
            }
            title={"Add New Subscription"}
          />
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
                "Auto-Renew",
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
                  currentSubscription?.status === "active" ? true : false,
                  currentSubscription?.cancel_at_period_end === true
                    ? "OFF"
                    : "ON",
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
    )
  );
};

export default Subscription;
