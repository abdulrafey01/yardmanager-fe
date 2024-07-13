import React from "react";
import GreenBtn from "../../../../abstracts/GreenBtn";
import PlanBox from "../../../../components/subscription/PlanBox";
import Link from "next/link";
import PaymentCard from "../../../../components/subscription/PaymentCard";

const page = () => {
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
        <GreenBtn title={"Add Payment Method"} />
      </div>

      {/* Main container */}
      <div className="h-full bg-white border rounded-xl border-gray-300 p-6 gap-4 flex flex-row justify-start items-start text-center">
        <PlanBox
          title={"Annual Plan"}
          description={
            "Take Your Business to the Next Level with 21 days free trails of yearly plan"
          }
          price={"$83"}
          features={[
            "Advanced Marketing Tools",
            "Customizable Templates",
            "Multi-user Access",
            "Third-party Integrations",
            "24/7 Priority Support",
          ]}
          btnGreen={true}
          premium={true}
          myPlanBox={true}
        />
        <PaymentCard />
      </div>
    </div>
  );
};

export default page;
