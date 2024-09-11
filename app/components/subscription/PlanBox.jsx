import Image from "next/image";
import React from "react";
import DiamondIcon from "../../assets/main/68-diamond.svg";
import DiamondGreen from "../../assets/main/70-diamond.svg";
import TickIcon from "../../assets/main/69-tick.svg";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setShowToast } from "../../../lib/features/shared/sharedSlice";
import { getCookie } from "../../helpers/storage";
import { useRouter } from "next/navigation";

const PlanBox = ({
  features,
  title,
  description,
  price,
  premium,
  btnGreen = false,
  myPlanBox = false,
  currentSubscription = false,
  setCurrentSubscription,
}) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const cancelSubscription = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/subscription/cancel/" +
          currentSubscription.id,
        {
          headers: {
            Authorization: `Bearer ${
              getCookie("token") || window?.sessionStorage.getItem("token")
            }`,
          },
        }
      );
      setCurrentSubscription(false);
      // dispatch(
      //   setShowToast({
      //     value: true,
      //     msg: "Subscription Cancelled Successfully",
      //   })
      // );
      window?.location.reload();
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

  const getSecret = async (plan) => {
    if (currentSubscription?.cancel_at_period_end === true) {
      try {
        const response = await axios.put(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/subscription/s/" +
            currentSubscription.id,
          {
            priceId: plan,
          },
          {
            headers: {
              Authorization: `Bearer ${
                getCookie("token") || window?.sessionStorage.getItem("token")
              }`,
            },
          }
        );
        dispatch(
          setShowToast({
            value: true,
            msg: "Subscription Changed Successfully",
          })
        );
        setTimeout(() => {
          router.push("/subscription/");
        }, 2000);
      } catch (error) {
        dispatch(
          setShowToast({
            value: true,
            msg: "Failed To Change Plan",
            red: true,
          })
        );
      }
    } else {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL +
            "/subscription/subscription/" +
            plan,
          {
            headers: {
              Authorization: `Bearer ${
                getCookie("token") || window?.sessionStorage.getItem("token")
              }`,
            },
          }
        );

        router.push(
          `/subscription/my-plans?premium=${plan === "yearly" ? true : false}`
        );
      } catch (error) {
        if (
          error?.response?.data?.error?.includes(
            "Failed to update subscription"
          )
        ) {
          dispatch(
            setShowToast({
              value: true,
              msg: "Unsubscribe from other plan first",
              red: true,
            })
          );
        } else {
          dispatch(
            setShowToast({
              value: true,
              msg: error?.response?.data?.error,
              red: true,
            })
          );
        }
      }
    }
  };
  return (
    <div
      className={` relative border rounded-xl border-gray-300 flex flex-col  p-4 w-[18rem] sm:w-[25rem] items-start gap-4 ${
        premium && "border-[#6DE8A6] border-2"
      }`}
    >
      {/* Diamond icon */}
      <div
        className={`p-3 rounded-lg  ${premium ? "bg-black" : "bg-[#78FFB6]"}`}
      >
        <Image src={premium ? DiamondGreen : DiamondIcon} alt="SubscribeIcon" />
      </div>
      {/* Texts */}
      <p className="font-bold text-2xl">{title}</p>
      <p className="text-gray-600 text-start">{description}</p>
      {/* Price */}
      <div className="flex items-end gap-2">
        <p className="text-4xl font-bold text-[#6DE8A6]">{price}</p>
        <p className="text-black font-medium">
          {premium ? "Per Year" : "Per Month"}
        </p>
      </div>
      {/* Line */}
      <hr className=" w-full" />
      {/* Plan features */}
      {features.map((feature, index) => {
        return (
          <div className="flex gap-3" key={index}>
            <Image src={TickIcon} alt="TickIcon" />
            <p>{feature}</p>
          </div>
        );
      })}
      {/* Subscribe Button */}
      {myPlanBox ? (
        <div className="w-full flex justify-between gap-4">
          <Link
            href="/subscription/plans"
            className="cursor-pointer flex-1  bg-white border border-gray-300 sm:hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex justify-center items-center"
          >
            <p className="font-medium text-base">Cancel</p>
          </Link>
          <Link
            href="/subscription/plans"
            className="select-none cursor-pointer flex-1  py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
          >
            <p className="font-bold text-sm">Change Plan</p>
          </Link>
        </div>
      ) : !btnGreen ? ( // for monthly box
        <div className="w-full">
          {currentSubscription?.plan?.interval === "month" ? (
            <div
              onClick={cancelSubscription}
              className="cursor-pointer bg-white border border-gray-300 sm:hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex justify-center items-center"
            >
              <p className="font-medium text-base">Cancel</p>
            </div>
          ) : (
            <div
              onClick={() => getSecret("monthly")}
              className="cursor-pointer bg-white border border-gray-300 sm:hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex justify-center items-center"
            >
              <p className="font-medium text-base">Subscribe</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          {currentSubscription?.plan?.interval === "year" ? (
            <div
              onClick={cancelSubscription}
              className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
            >
              <p className="font-bold text-sm">Cancel</p>
            </div>
          ) : (
            <div
              onClick={() => {
                getSecret("yearly");
              }}
              className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
            >
              <p className="font-bold text-sm">Subscribe</p>
            </div>
          )}
        </div>
      )}
      {/* Best value container */}
      {/* If premium is true and myPlanBox is false */}
      {premium && !myPlanBox && (
        <div className="bg-[#6DE8A6] font-semibold sm:py-3 px-6 py-2 sm:px-9 rounded-lg absolute -top-6 left-[27%] sm:left-[32%] ">
          Best Value
        </div>
      )}
    </div>
  );
};

export default PlanBox;
