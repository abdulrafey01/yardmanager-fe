import Image from "next/image";
import React from "react";
import DiamondIcon from "../../assets/main/68-diamond.svg";
import TickIcon from "../../assets/main/69-tick.svg";
import WhiteBtn from "../../abstracts/WhiteBtn";
import GreenBtn from "../../abstracts/GreenBtn";

const PlanBox = ({
  features,
  title,
  description,
  price,
  iconBlack,
  btnGreen = false,
}) => {
  return (
    <div className="border rounded-xl border-gray-300 flex flex-col  p-4 w-[38%] items-start gap-4">
      {/* Diamond icon */}
      <div className="p-3 rounded-lg bg-[#78FFB6]">
        <Image src={DiamondIcon} alt="SubscribeIcon" />
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
      <div className="w-full">
        {!btnGreen ? (
          <div className="cursor-pointer bg-white border border-gray-300 hover:bg-[#EDEEF2] py-3 px-4 text-left rounded-lg flex justify-center items-center">
            <p className="font-medium text-base">Subscribe</p>
          </div>
        ) : (
          <div className="select-none cursor-pointer py-3 px-4 bg-[#78FFB6] hover:bg-[#37fd93]  text-left rounded-lg flex justify-center ">
            <p className="font-bold text-sm">Subscribe</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanBox;
