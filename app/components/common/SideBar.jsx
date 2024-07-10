"use client";
import React, { useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";
import ArrowIcon from "../../assets/main/26-arrow.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setShowSideBar,
} from "../../../lib/features/shared/sharedSlice";
const SideBar = () => {
  const pathName = usePathname();
  const [activeMainBtn, setActiveMainBtn] = useState(-1);
  const [activeBottomBtn, setActiveBottomBtn] = useState(-1);
  const { showSideBar, currentPage } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const [hideBtns, setHideBtns] = useState({});
  const [showBtns, setShowBtns] = useState([]);
  const btnNames = [
    "inventory",
    "invoices",
    "locations",
    "parts",
    "recycled",
    "employees",
    "roles",
  ];

  // name 2 is just used to filter them for hiding
  const sideButtonsMain = [
    {
      name: "Dashboard",
      iconW: HomeSvg,
      iconB: HomeSvgB,
      route: "/dashboard",
      name2: "dashboard",
    },
    {
      name: "Inventory",
      iconW: InvtSvg,
      iconB: InvtSvgB,
      route: "/inventory",
      name2: "inventory",
    },
    {
      name: "Invoices",
      iconW: InvSvg,
      iconB: InvSvgB,
      route: "/invoices",
      name2: "invoices",
    },
    {
      name: "Locations",
      iconW: LocSvg,
      iconB: LocSvgB,
      route: "/locations",
      name2: "locations",
    },
    {
      name: "Parts",
      iconW: PartsSvg,
      iconB: PartSvgB,
      route: "/parts",
      name2: "parts",
    },
    {
      name: "Deleted Items",
      iconW: DelSvg,
      iconB: DelSvgB,
      route: "/deleted-items",
      name2: "recycled",
    },
    {
      name: "Employees",
      iconW: EmpSvg,
      iconB: EmpSvgB,
      route: "/employees",
      name2: "employees",
    },
    {
      name: "Role / Permissions",
      iconW: RoleSvg,
      iconB: RoleSvgB,
      route: "/roles",
      name2: "roles",
    },
    {
      name: "My Vehicle",
      iconW: CarSvg,
      iconB: CarSvgB,
      route: "/vehicle",
      name2: "vehicle",
    },
    {
      name: "Subscription",
      iconW: SubcSvg,
      iconB: SubSvgB,
      name2: "subscription",
    },
  ];
  const sideButtonsBottom = [
    {
      name: "Settings",
      iconW: SettSvg,
      iconB: SetSvgB,
      route: "/settings",
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

  // Hide buttons based on user permissions
  useEffect(() => {
    if (user) {
      if (user.userType === "user") {
        return setShowBtns(sideButtonsMain);
      }
      const updatedHideBtns = {};

      btnNames.forEach((name) => {
        const privilege = user.data.role.privileges.find(
          (privilege) => privilege.name === name
        );
        updatedHideBtns[name] = privilege ? !privilege.permissions.read : true;
      });

      setHideBtns(updatedHideBtns);
    }
  }, [user]);

  useEffect(() => {
    console.log(hideBtns);
    setShowBtns(sideButtonsMain.filter((btn) => !hideBtns[btn.name2]));
  }, [hideBtns]);
  // Disable side buttons on certain pages
  useEffect(() => {
    if (currentPage === "MyProfile") {
      setActiveBottomBtn(-1);
      setActiveMainBtn(-1);
    }
    if (pathName === "/dashboard") {
      setActiveMainBtn(0);
    }
    if (pathName === "/inventory") {
      setActiveMainBtn(1);
    }
    if (pathName === "/invoices") {
      setActiveMainBtn(2);
    }
    if (pathName === "/locations") {
      setActiveMainBtn(3);
    }
    if (pathName === "/parts") {
      setActiveMainBtn(4);
    }
    if (pathName === "/deleted-items") {
      setActiveMainBtn(5);
    }
    if (pathName === "/employees") {
      setActiveMainBtn(6);
    }
    if (pathName === "/roles") {
      setActiveMainBtn(7);
    }
    if (pathName === "/vehicle") {
      setActiveMainBtn(8);
    }
    if (pathName === "/subscription") {
      setActiveMainBtn(9);
    }
    if (pathName === "/settings") {
      setActiveBottomBtn(0);
    }
    if (pathName === "/privacy-policy") {
      setActiveBottomBtn(1);
    }
    if (pathName === "/terms-condition") {
      setActiveBottomBtn(2);
    }
  }, [currentPage, pathName]);

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
              onClick={() => dispatch(setShowSideBar(!showSideBar))}
            />
          </div>
          {/* Line */}
          <Image src={LineSvg} alt="line" />
        </div>
        {/* Middle Part */}
        <div className="w-full ">
          {showBtns.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setActiveMainBtn(index);
                  setActiveBottomBtn(-1);
                  router.push(item.route);
                  dispatch(setShowSideBar(false));
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
                  dispatch(setShowSideBar(false));
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
    </>
  );
};

export default SideBar;
