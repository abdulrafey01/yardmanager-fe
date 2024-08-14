"use client";
import React, { useEffect } from "react";
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
import { useSearchParams } from "next/navigation";

const page = () => {
  const dispatch = useDispatch();
  const [isCheckedOut, setCheckedOut] = React.useState(false);
  const params = useSearchParams();
  const premium = params.get("premium");

  useEffect(() => {
    dispatch(setCurrentPage("Subscription"));
  }, [dispatch]);

  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      {/* First container for Buttons */}
      <div className="flex items-center justify-between space-x-4  w-full p-1">
        <Link
          href={"/subscription/plans"}
          className="font-semibold text-lg cursor-pointer select-none"
        >
          Back
        </Link>
        {/* Add Payment Button */}
        <GreenBtn
          onClick={() => {
            dispatch(setShowSideMenu({ value: true, mode: "add" }));
          }}
          title={"Add Payment Method"}
        />
      </div>

      {/* Main container */}
      <div className="h-full bg-white border rounded-xl border-gray-300 p-6 gap-8 flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start text-center ">
        {!isCheckedOut && (
          <PlanBox
            title={premium === "true" ? "Annual Plan" : "Monthly Plan"}
            description={`Take Your Business to the Next Level with 21 days free trails of ${
              premium === "true" ? "annual" : "monthly"
            } plan`}
            price={"$83"}
            features={[
              "Advanced Marketing Tools",
              "Customizable Templates",
              "Multi-user Access",
              "Third-party Integrations",
              "24/7 Priority Support",
            ]}
            btnGreen={true}
            premium={premium === "true"}
            myPlanBox={true}
          />
        )}

        <StripeComponent premium={premium} />
        {/* <PaymentCard
          isCheckedOut={isCheckedOut}
          setIsCheckedOut={setCheckedOut}
        /> */}
        {/* <BankCard isCheckedOut={isCheckedOut} /> */}
      </div>
    </div>
  );
};

export default page;
