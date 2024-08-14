"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../lib/features/shared/sharedSlice";
import GreenBtn from "../../../abstracts/GreenBtn";
import NoSubscribeIcon from "../../../assets/main/67-nosubscribe.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "../../../helpers/storage";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(setCurrentPage("Subscription"));
  }, [dispatch]);

  const [currentSubscription, setCurrentSubscription] = React.useState(null);
  useEffect(async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/subscription/subscription",
        {
          headers: {
            Authorization: `Bearer ${
              getCookie("token") || window?.sessionStorage.getItem("token")
            }`,
          },
        }
      );
      console.log("subscription", response?.data);
      setCurrentSubscription(response?.data?.data[0]);
    } catch (error) {}
  }, []);

  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div className="flex items-center justify-end space-x-4  w-full ">
        {/* Subscribe Button */}
        <GreenBtn route={"/subscription/plans"} title={"Subscribe"} />
      </div>
      {!currentSubscription ? (
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
      ) : (
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
                "Mashaim Tariq",
                currentSubscription?.plan?.interval === "month"
                  ? "Monthly"
                  : "Yearly",
                "10/10/2022",
                "10/10/2022",
                currentSubscription?.plan?.active === true
                  ? "Active"
                  : "Inactive",
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
