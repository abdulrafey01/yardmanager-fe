"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setShowSideMenu,
} from "../../../lib/features/shared/sharedSlice";
import GreenBtn from "../../abstracts/GreenBtn";
import NoSubscribeIcon from "../../assets/main/67-nosubscribe.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "../../helpers/storage";
import TableHead from "../../components/common/TableHead";
import TableRow from "../../components/common/TableRow";

const page = ({ isAdmin = false }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(setCurrentPage("SubscriptionAdmin"));
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);

  const [currentSubscription, setCurrentSubscription] = React.useState(null);

  useEffect(() => {
    const getSubscription = async () => {
      let token, companyId;
      // role based token
      if (isAdmin) {
        token =
          getCookie("adminToken") ||
          window?.sessionStorage.getItem("adminToken");
        companyId = JSON.parse(localStorage.getItem("companyId"));
      } else {
        token = getCookie("token") || window?.sessionStorage.getItem("token");
      }
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL +
            `/subscription/subscription${
              isAdmin ? `?company=${companyId}` : ""
            }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("subscription", response?.data);
        setCurrentSubscription(response?.data?.data[0]);
      } catch (error) {}
    };
    getSubscription();
  }, []);

  // Cancel Subscription
  const cancelSubscription = async () => {
    try {
      let token;

      if (isAdmin) {
        token =
          getCookie("adminToken") ||
          window?.sessionStorage.getItem("adminToken");
      } else {
        token = getCookie("token") || window?.sessionStorage.getItem("token");
      }
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/subscription/cancel/" +
          currentSubscription.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentSubscription(false);

      if (!isAdmin) {
        window?.location.reload();
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        setShowToast({
          value: true,
          msg: "Fail to cancel subscription",
          red: true,
        })
      );
    }
  };
  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div
        className={` items-center justify-end space-x-4  w-full ${
          isAdmin ? "hidden" : "flex"
        }`}
      >
        {/* Subscribe Button */}
        <div
          className={`${
            (currentSubscription === null && "hidden") || currentSubscription
              ? "hidden"
              : "flex"
          }`}
        >
          <GreenBtn route={`/subscription/plans`} title={"Subscribe"} />
        </div>
        <div className={`${currentSubscription ? "flex" : "hidden"}`}>
          <GreenBtn
            onClick={() => {
              cancelSubscription();
            }}
            title={"Cancel Subscription"}
          />
        </div>
        <GreenBtn route={`/subscription/cards`} title={"Cards List"} />
      </div>

      {!currentSubscription ? (
        <>
          <div
            className={` items-center justify-end space-x-4  w-full ${
              isAdmin ? "flex" : "hidden"
            }`}
          >
            {/* Subscribe Button for admin page : Company overview*/}
            <GreenBtn
              onClick={() => {
                dispatch(setShowSideMenu({ value: true, mode: "add" }));
              }}
              title={"Subscribe"}
            />
          </div>
          <div className="h-full border rounded-xl border-gray-300 flex flex-col justify-center  gap-4 items-center text-center tracking-wider">
            <Image src={NoSubscribeIcon} alt="NoSubscribeIcon" />
            <div className="flex flex-col gap-2">
              <p className="font-bold">No Subscription Yet</p>
              <p className="text-gray-600">
                Enhance your experience with a subscription. Purchase now to{" "}
                <br />
                unlock features!
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`  items-center justify-end space-x-4  w-full ${
              isAdmin ? "flex" : "hidden"
            }`}
          >
            {/* Subscribe cancel Button for admin page : Company overview*/}
            <GreenBtn
              onClick={() => {
                cancelSubscription();
              }}
              title={"Cancel Subscription"}
            />
          </div>
          <div className=" border rounded-xl border-gray-300 flex flex-col">
            {/* Table Title container */}
            <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
              <p className="hidden sm:block font-bold text-lg md:text-2xl">
                Subscription Items
              </p>
              <p className="sm:hidden font-bold text-lg md:text-2xl">
                Subscription
              </p>
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
              <TableRow
                titles={[
                  "1",
                  user?.data?.name?.first + " " + user?.data?.name?.last,
                  currentSubscription?.plan?.interval === "month"
                    ? "Monthly"
                    : "Yearly",
                  new Date(
                    currentSubscription?.latest_invoice?.period_start * 1000
                  ).toLocaleDateString(),
                  new Date(
                    currentSubscription?.latest_invoice?.period_end * 1000
                  ).toLocaleDateString(),
                  currentSubscription?.plan?.active,
                ]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
