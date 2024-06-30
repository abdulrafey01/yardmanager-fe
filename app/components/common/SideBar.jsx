"use client";
import React, { useState } from "react";
import Header from "./Header";
import Image from "next/image";
import LineSvg from "../../assets/auth/6-Line_01.svg";
import HomeSvg from "../../assets/main/1-home-line.svg";
import InvtSvg from "../../assets/main/2-Icon.svg";
import InvSvg from "../../assets/main/25-invw.svg";
import LocSvg from "../../assets/main/4-route.svg";
import PartsSvg from "../../assets/main/5-pie-chart-01.svg";
import DelSvg from "../../assets/main/6-trash-01.svg";
import EmpSvg from "../../assets/main/7-users-02.svg";
import RoleSvg from "../../assets/main/8-file-lock-02.svg";
import CarSvg from "../../assets/main/7-noraiz.svg";
import SubcSvg from "../../assets/main/9-presentation-chart-03.svg";
import SettSvg from "../../assets/main/10-settings-01.svg";
import PvcSvg from "../../assets/main/11-shield-tick.svg";
import TermSvg from "../../assets/main/12-fingerprint-03.svg";
import HomeSvgB from "../../assets/main/24-homeblack.svg";
import InvtSvgB from "../../assets/main/14-invtblack.svg";
import InvSvgB from "../../assets/main/3-Icon.svg";
import LocSvgB from "../../assets/main/19-locblack.svg";
import PartSvgB from "../../assets/main/16-partsblack.svg";
import DelSvgB from "../../assets/main/17-delblack.svg";
import EmpSvgB from "../../assets/main/18-empblack.svg";
import RoleSvgB from "../../assets/main/15-roleblack.svg";
import CarSvgB from "../../assets/main/20-carblack.svg";
import SubSvgB from "../../assets/main/13-subsblack.svg";
import SetSvgB from "../../assets/main/23-setblack.svg";
import PvcSvgB from "../../assets/main/22-pvcblack.svg";
import TermSvgB from "../../assets/main/21-termblack.svg";
import BurgerIcon from "../../assets/main/38-burger.svg";

import ArrowIcon from "../../assets/main/26-arrow.svg";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../lib/features/shared/sharedSlice";
const SideBar = () => {
  const [activeMainBtn, setActiveMainBtn] = useState(0);
  const [activeBottomBtn, setActiveBottomBtn] = useState(-1);
  const [showSideBar, setShowSideBar] = useState(false);
  const sideButtonsMain = [
    {
      name: "Dashboard",
      iconW: HomeSvg,
      iconB: HomeSvgB,
    },
    {
      name: "Inventory",
      iconW: InvtSvg,
      iconB: InvtSvgB,
      route: "/inventory",
    },
    {
      name: "Invoices",
      iconW: InvSvg,
      iconB: InvSvgB,
      route: "/invoices",
    },
    {
      name: "Locations",
      iconW: LocSvg,
      iconB: LocSvgB,
      route: "/locations",
    },
    {
      name: "Parts",
      iconW: PartsSvg,
      iconB: PartSvgB,
      route: "/parts",
    },
    {
      name: "Deleted Items",
      iconW: DelSvg,
      iconB: DelSvgB,
      route: "/deleted-items",
    },
    {
      name: "Employees",
      iconW: EmpSvg,
      iconB: EmpSvgB,
    },
    {
      name: "Role / Permissions",
      iconW: RoleSvg,
      iconB: RoleSvgB,
      route: "/roles",
    },
    {
      name: "My Vehicle",
      iconW: CarSvg,
      iconB: CarSvgB,
      route: "/vehicle",
    },
    {
      name: "Subscription",
      iconW: SubcSvg,
      iconB: SubSvgB,
    },
  ];
  const sideButtonsBottom = [
    {
      name: "Settings",
      iconW: SettSvg,
      iconB: SetSvgB,
    },
    {
      name: "Privacy Policy",
      iconW: PvcSvg,
      iconB: PvcSvgB,
      route: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      iconW: TermSvg,
      iconB: TermSvgB,
      route: "/terms-condition",
    },
  ];

  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`${
          showSideBar ? "flex" : "hidden"
        } flex-1 bg-black  xl:flex absolute z-10 md:relative h-full md:h-auto flex-col justify-start items-center p-6 space-y-6 overflow-y-auto `}
      >
        {/* Top part */}
        <div className="flex flex-col space-y-6 ">
          <div className="flex items-center justify-between">
            <Header />
            <Image
              src={ArrowIcon}
              alt="arrow"
              className="rotate-180 cursor-pointer  md:hidden"
              onClick={() => setShowSideBar(!showSideBar)}
            />
          </div>
          {/* Line */}
          <Image src={LineSvg} alt="line" />
        </div>
        {/* Middle Part */}
        <div className="w-full ">
          {sideButtonsMain.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setActiveMainBtn(index);
                  setActiveBottomBtn(-1);
                  router.push(item.route);
                }}
                className={`w-full flex space-x-2 items-center ${
                  activeMainBtn === index
                    ? "bg-[#78FFB6] hover:bg-[#78FFB6]"
                    : "hover:bg-[#ecf2ef49]"
                } rounded-lg p-3 cursor-pointer `}
              >
                <Image
                  src={activeMainBtn === index ? item.iconB : item.iconW}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p
                  className={`${
                    activeMainBtn === index
                      ? "text-black font-medium"
                      : "text-white"
                  } text-xs sm:text-base`}
                >
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Part */}
        <div className="w-full flex-1 flex flex-col items-center justify-end ">
          {sideButtonsBottom.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setActiveBottomBtn(index);
                  setActiveMainBtn(-1);
                  router.push(item.route);
                }}
                className={`w-full flex space-x-2 items-center ${
                  activeBottomBtn === index
                    ? "bg-[#78FFB6] hover:bg-[#78FFB6]"
                    : "hover:bg-[#ecf2ef49]"
                } rounded-lg p-3 cursor-pointer `}
              >
                <Image
                  src={activeBottomBtn === index ? item.iconB : item.iconW}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p
                  className={`${
                    activeBottomBtn === index
                      ? "text-black font-medium"
                      : "text-white"
                  } text-xs sm:text-base`}
                >
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Burger Icon */}
      <div
        onClick={() => setShowSideBar(!showSideBar)}
        className={`md:hidden absolute top-3 right-3  rotate-180    rounded-full  cursor-pointer hover:bg-slate-200`}
      >
        <Image src={BurgerIcon} alt="Sidebar" height={30} width={30} />
      </div>
    </>
  );
};

export default SideBar;
