"use client";

import React, { useEffect } from "react";

import PaymentCard from "../../../../components/subscription/PaymentCard";
import BankCard from "../../../../components/subscription/BankCard";
import Link from "next/link";
import { useDispatch } from "react-redux";
import GreenBtn from "../../../../abstracts/GreenBtn";
import { getCookie } from "../../../../helpers/storage";
import axios from "axios";
import { setCurrentPage } from "../../../../../lib/features/shared/sharedSlice";
import { useRouter } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const [cardsList, setCardsList] = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    dispatch(setCurrentPage("Subscription"));
  }, [dispatch]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/subscription/cards",
          {
            headers: {
              Authorization: `Bearer ${
                getCookie("token") || window?.sessionStorage.getItem("token")
              }`,
            },
          }
        );
        setCardsList(response.data?.data);
      } catch (error) {
        dispatch(
          setShowToast({
            value: true,
            msg: "Fail To Show Cards List",
            red: true,
          })
        );
      }
    };
    getCards();
  }, []);

  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      {/* First container for Buttons */}
      <div className="flex items-center justify-between space-x-4  w-full p-1">
        <div
          onClick={() => {
            router.back();
          }}
          className="font-semibold text-lg cursor-pointer select-none"
        >
          Back
        </div>
        {/* Add Payment Button
        <GreenBtn
          onClick={() => {
            dispatch(setShowSideMenu({ value: true, mode: "add" }));
          }}
          title={"Add Payment Method"}
        /> */}
      </div>

      {/* Main container */}
      <div className="h-full bg-white border rounded-xl border-gray-300 p-6  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
          {cardsList?.map((card) => {
            return <PaymentCard key={card?._id} card={card} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
