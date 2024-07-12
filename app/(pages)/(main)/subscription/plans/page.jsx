import React from "react";
import PlanBox from "../../../../components/subscription/PlanBox";
const page = () => {
  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      {/* Main container */}
      <div className="h-full border rounded-xl border-gray-300 p-4 gap-4 flex flex-col justify-center items-center text-center">
        {/* Text container */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg">
            Choose the Plan that Suits Your Needs
          </p>
          <p className="text-gray-600">
            Our pricing section provides clear and straightforward options,
            making it easy for you to choose <br /> the plan that best fits your
            needs.
          </p>
        </div>
        {/* Plans container */}
        <div className="w-full flex-col md:flex-row flex justify-center items-center gap-4">
          <PlanBox
            title={"Monthly Plan"}
            description={
              "Take Your Business to the Next Level with 21 days free trails of yearly plan"
            }
            price={"$105"}
            features={[
              "Advanced Marketing Tools",
              "Customizable Templates",
              "Multi-user Access",
              "Third-party Integrations",
              "24/7 Priority Support",
            ]}
          />
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
          />
        </div>
      </div>
    </div>
  );
};

export default page;
