import Image from "next/image";
import React from "react";
import DiamondIcon from "../../assets/main/68-diamond.svg";
import DiamondGreen from "../../assets/main/70-diamond.svg";
import TickIcon from "../../assets/main/69-tick.svg";
import Link from "next/link";

const PlanBox = ({
  features,
  title,
  description,
  price,
  premium,
  btnGreen = false,
  myPlanBox = false,
}) => {
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
        <p className="text-black font-medium">Per Month</p>
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
          <div className="cursor-pointer flex-1  bg-white border border-gray-300 sm:hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex justify-center items-center">
            <p className="font-medium text-base">Cancel</p>
          </div>
          <Link
            href="/subscription/my-plans"
            className="select-none cursor-pointer flex-1  py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
          >
            <p className="font-bold text-sm">Change Plan</p>
          </Link>
        </div>
      ) : !btnGreen ? (
        <div className="w-full">
          <Link
            href="/subscription/my-plans?premium=false"
            className="cursor-pointer bg-white border border-gray-300 sm:hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex justify-center items-center"
          >
            <p className="font-medium text-base">Subscribe</p>
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <Link
            href="/subscription/my-plans?premium=true"
            className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex justify-center "
          >
            <p className="font-bold text-sm">Subscribe</p>
          </Link>
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
