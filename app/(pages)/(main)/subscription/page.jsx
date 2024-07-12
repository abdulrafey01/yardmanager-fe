"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../lib/features/shared/sharedSlice";
import GreenBtn from "../../../abstracts/GreenBtn";
import NoSubscribeIcon from "../../../assets/main/67-nosubscribe.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(setCurrentPage("Subscription"));
  }, [dispatch]);
  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      <div className="flex items-center justify-end space-x-4  w-full ">
        {/* Subscribe Button */}
        <GreenBtn route={"/subscription/plans"} title={"Subscribe"} />
      </div>
      {/* Main container */}
      <div className="h-full border rounded-xl border-gray-300 flex flex-col justify-center items-center text-center tracking-wider">
        <Image src={NoSubscribeIcon} alt="NoSubscribeIcon" />
        <p className="font-bold">No Subscription Yet</p>
        <p className="text-gray-600">
          Enhance your experience with a subscription. Purchase now to <br />
          unlock features!
        </p>
      </div>
    </div>
  );
};

export default page;
