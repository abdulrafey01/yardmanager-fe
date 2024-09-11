"use client";
import React, { useEffect } from "react";
import PlanBox from "../../../../components/subscription/PlanBox";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../../lib/features/shared/sharedSlice";
import { getCookie } from "../../../../helpers/storage";
import axios from "axios";
const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage("Subscription"));
  }, [dispatch]);

  const [currentSubscription, setCurrentSubscription] = React.useState(null);

  useEffect(() => {
    const getSubscription = async () => {
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
    };
    getSubscription();
  }, []);
  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      {/* Main container */}
      <div className="h-full bg-white border rounded-xl border-gray-300 p-4 gap-4 flex flex-col justify-center items-center text-center">
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
        <div className="w-full flex-col lg:flex-row flex justify-center items-center gap-6">
          {currentSubscription?.cancel_at_period_end === true ? (
            currentSubscription?.plan?.interval === "month" ? (
              <PlanBox
                title={"Annual Plan"}
                // description={
                //   "Take Your Business to the Next Level with 21 days free trails of yearly plan"
                // }
                price={"$996"}
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
                premium={true} // used
                currentSubscription={currentSubscription}
                setCurrentSubscription={setCurrentSubscription}
              />
            ) : (
              <PlanBox
                title={"Monthly Plan"}
                // description={
                //   "Take Your Business to the Next Level with 21 days free trails of yearly plan"
                // }
                price={"$105"}
                features={
                  [
                    // "Advanced Marketing Tools",
                    // "Customizable Templates",
                    // "Multi-user Access",
                    // "Third-party Integrations",
                    // "24/7 Priority Support",
                  ]
                }
                currentSubscription={currentSubscription}
                setCurrentSubscription={setCurrentSubscription}
              />
            )
          ) : (
            <>
              <PlanBox
                title={"Monthly Plan"}
                // description={
                //   "Take Your Business to the Next Level with 21 days free trails of yearly plan"
                // }
                price={"$105"}
                features={
                  [
                    // "Advanced Marketing Tools",
                    // "Customizable Templates",
                    // "Multi-user Access",
                    // "Third-party Integrations",
                    // "24/7 Priority Support",
                  ]
                }
                currentSubscription={currentSubscription}
                setCurrentSubscription={setCurrentSubscription}
              />
              <PlanBox
                title={"Annual Plan"}
                // description={
                //   "Take Your Business to the Next Level with 21 days free trails of yearly plan"
                // }
                price={"$996"}
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
                premium={true} // used
                currentSubscription={currentSubscription}
                setCurrentSubscription={setCurrentSubscription}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
