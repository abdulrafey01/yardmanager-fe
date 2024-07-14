import React from "react";
import Image from "next/image";
import YardIcon from "../../../assets/auth/yardicon-1.svg";
import ManImg from "../../../assets/auth/man_img-2.svg";
import BoxImg1 from "../../../assets/auth/Illustrations-3.svg";
import BoxImg2 from "../../../assets/auth/Illustrations-4.svg";
import BoxImg3 from "../../../assets/auth/Illustrations-5.svg";
import Header from "../../common/Header";
const SectionOne = () => {
  return (
    <div className="flex-1 hidden lg:flex flex-col  bg-black  p-8 justify-between items-center space-y-16 overflow-clip">
      <div className="flex flex-col space-y-4 w-full items-center overflow-visible">
        <div className="w-full">
          <Header />
        </div>
        <div className=" relative overflow-visible">
          <Image
            // className="sm:w-80 sm:h-80"
            src={ManImg}
            alt="logo"
            width={350}
            height={450}
          />
          <Image
            className="absolute sm:top-56 sm:right-48 sm:w-56 sm:h-56 top-24 right-28 w-32 h-32"
            src={BoxImg1}
            alt="logo"
          />
          <Image
            className="absolute top-16 left-36 sm:w-48 sm:h-48 sm:top-32 sm:left-64  w-32 h-32"
            src={BoxImg2}
            alt="logo"
          />
          <Image
            className="absolute top-48 left-28 w-32 h-32 sm:w-52 sm:h-52 sm:top-[360px] sm:left-36"
            src={BoxImg3}
            alt="logo"
          />
        </div>
      </div>
      {/* Text containers */}
      <div className=" w-full flex flex-col space-y-6 text-white">
        <p className="text-sm font-bold sm:text-xl">
          The simplest way to mange your Auto Parts Inventory
        </p>
        <p className="text-sm pr-5"></p>
        <div className="flex justify-between items-center sm:justify-start sm:space-x-2">
          <div className="h-2 w-20 rounded bg-[#78FFB6]"></div>
          <div className="h-2 w-20 rounded bg-[#78FFB6]"></div>
          <div className="h-2 w-20 rounded bg-[#78FFB6]"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
