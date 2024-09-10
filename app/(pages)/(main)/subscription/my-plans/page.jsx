"use client";
import React, { Suspense, useEffect } from "react";
import GreenBtn from "../../../../abstracts/GreenBtn";
import PlanBox from "../../../../components/subscription/PlanBox";
import Link from "next/link";
import PaymentCard from "../../../../components/subscription/PaymentCard";
import BankCard from "../../../../components/subscription/BankCard";
import {
  setCurrentPage,
  setShowSideMenu,
} from "../../../../../lib/features/shared/sharedSlice";
import { useDispatch } from "react-redux";
import StripeComponent from "../../../../components/stripe/StripeComponent";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getCookie } from "../../../../helpers/storage";

const MyPlans = () => {
  const dispatch = useDispatch();
  const [isCheckedOut, setCheckedOut] = React.useState(false);
  const params = useSearchParams();
  const premium = params.get("premium");
  const [clientSecret, setClientSecret] = React.useState(null);

  useEffect(() => {
    dispatch(setCurrentPage("Subscription"));
  }, [dispatch]);

  const router = useRouter();

  useEffect(() => {
    const getSecret = async () => {
      console.log("Called");
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
        console.log(
          "subscription",
          response?.data?.data[0]?.latest_invoice?.payment_intent?.client_secret
        );
        setClientSecret(
          response?.data?.data[0]?.latest_invoice?.payment_intent?.client_secret
        );
      } catch (error) {}
    };
    getSecret();
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
        {/* Add Payment Button */}
        {/* <GreenBtn
          onClick={() => {
            dispatch(setShowSideMenu({ value: true, mode: "add" }));
          }}
          title={"Add Payment Method"}
        /> */}
      </div>

      {/* Main container */}
      <div className="h-full bg-white border rounded-xl border-gray-300 p-6 gap-8 flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start text-center ">
        {!isCheckedOut && (
          <PlanBox
            title={premium === "true" ? "Annual Plan" : "Monthly Plan"}
            // description={`Take Your Business to the Next Level with 21 days free trails of ${
            //   premium === "true" ? "annual" : "monthly"
            // } plan`}
            price={premium === "true" ? "$996" : "$105"}
            features={
              [
                // "Advanced Marketing Tools",
                // "Customizable Templates",
                // "Multi-user Access",
                // "Third-party Integrations",
                // "24/7 Priority Support",
              ]
            }
            btnGreen={true}
            premium={premium === "true"}
            myPlanBox={true}
          />
        )}

        <StripeComponent clientSecret={clientSecret} premium={premium} />
        {/* <PaymentCard
          isCheckedOut={isCheckedOut}
          setIsCheckedOut={setCheckedOut}
        /> */}
        {/* <BankCard isCheckedOut={isCheckedOut} /> */}
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense>
      <MyPlans />
    </Suspense>
  );
};
export default page;
