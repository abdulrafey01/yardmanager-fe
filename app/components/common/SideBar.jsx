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
import YardSvg from "../../assets/main/78-yardHomeW.svg";
import YardSvgB from "../../assets/main/79-YardHomeB.svg";
import BurgerIcon from "../../assets/main/38-burger.svg";
import { usePathname } from "next/navigation";
import ArrowIcon from "../../assets/main/26-arrow.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideBar } from "../../../lib/features/shared/sharedSlice";
import Link from "next/link";
const SideBar = () => {
  const pathName = usePathname();
  const [activeMainBtn, setActiveMainBtn] = useState(-1);
  const [activeBottomBtn, setActiveBottomBtn] = useState(-1);
  const { showSideBar, currentPage } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const [hideBtns, setHideBtns] = useState({
    dashboard: true,
    inventory: true,
    invoices: true,
    locations: true,
    parts: true,
    recycled: true,
    employees: true,
    roles: true,
    vehicles: true,
    subscription: true,
    settings: true,
  });
  const [showBtns, setShowBtns] = useState([]);
  const [showBtnsBottom, setShowBtnsBottom] = useState([]);
  const btnNames = [
    "inventory",
    "invoices",
    "locations",
    "parts",
    "recycled",
    "employees",
    "roles",
    "settings",
    "vehicles",
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
      name2: "vehicles",
    },
    {
      name: "Subscription",
      iconW: SubcSvg,
      iconB: SubSvgB,
      name2: "subscription",
      route: "/subscription",
    },
  ];
  const sideButtonsBottom = [
    {
      name: "Settings",
      iconW: SettSvg,
      iconB: SetSvgB,
      route: user?.userType === "admin" ? "/admin/settings" : "/settings",
      name2: "settings",
    },
    {
      name: "Privacy Policy",
      iconW: PvcSvg,
      iconB: PvcSvgB,
      route:
        user?.userType === "admin"
          ? "/admin/privacy-policy"
          : "/privacy-policy",
      name2: "privacy-policy",
    },
    {
      name: "Terms & Conditions",
      iconW: TermSvg,
      iconB: TermSvgB,
      route:
        user?.userType === "admin"
          ? "/admin/terms-condition"
          : "/terms-condition",
      name2: "terms-condition",
    },
  ];

  // Hide buttons based on user permissions
  useEffect(() => {
    if (pathName.includes("/admin")) {
      setShowBtns(adminSideButtonsMain);
      setShowBtnsBottom(sideButtonsBottom);
      return;
    }
    if (user) {
      if (user?.userType === "user") {
        setShowBtns(sideButtonsMain);
        setShowBtnsBottom(sideButtonsBottom);
        return;
      }
      const updatedHideBtns = {};

      btnNames.forEach((name) => {
        const privilege = user?.data?.role?.privileges.find(
          (privilege) => privilege.name === name
        );
        updatedHideBtns[name] = privilege
          ? !privilege?.permissions?.read
          : true;
      });

      setHideBtns(updatedHideBtns);
    }
  }, [user]);

  useEffect(() => {
    setShowBtns(sideButtonsMain.filter((btn) => !hideBtns[btn.name2]));
    setShowBtnsBottom(sideButtonsBottom.filter((btn) => !hideBtns[btn.name2]));
  }, [hideBtns]);

  // Disable side buttons on certain pages and set active buttons on refresh
  useEffect(() => {
    if (currentPage === "MyProfile") {
      setActiveBottomBtn(-1);
      setActiveMainBtn(-1);
    }
    if (pathName === "/dashboard") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "dashboard"));
    } else if (pathName === "/inventory") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "inventory"));
    } else if (pathName === "/invoices") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "invoices"));
    } else if (pathName === "/locations") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "locations"));
    } else if (pathName === "/parts") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "parts"));
    } else if (pathName === "/deleted-items") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "recycled"));
    } else if (pathName === "/employees") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "employees"));
    } else if (pathName === "/roles") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "roles"));
    } else if (pathName === "/vehicle") {
      setActiveMainBtn(showBtns.findIndex((btn) => btn.name2 === "vehicles"));
    } else if (
      pathName === "/subscription" ||
      pathName === "/subscription/plans" ||
      pathName === "/subscription/my-plans"
    ) {
      setActiveMainBtn(
        showBtns.findIndex((btn) => btn.name2 === "subscription")
      );
    } else if (pathName === "/settings") {
      setActiveBottomBtn(
        showBtnsBottom.findIndex((btn) => btn.name2 === "settings")
      );
    } else if (pathName === "/privacy-policy") {
      setActiveBottomBtn(
        showBtnsBottom.findIndex((btn) => btn.name2 === "privacy-policy")
      );
    } else if (pathName === "/terms-condition") {
      setActiveBottomBtn(
        showBtnsBottom.findIndex((btn) => btn.name2 === "terms-condition")
      );
    }
    // For admin
    else if (pathName === "/admin/dashboard") {
      setActiveMainBtn(0);
    } else if (pathName === "/admin/yards") {
      setActiveMainBtn(1);
    } else if (pathName === "/admin/inventory") {
      setActiveMainBtn(2);
    } else if (pathName === "/admin/subscription") {
      setActiveMainBtn(3);
    } else {
      setActiveMainBtn(-1);
    }
  }, [currentPage, pathName, showBtns]);

  const router = useRouter();
  const dispatch = useDispatch();

  // Admin panel
  // admin panel side buttons
  const adminSideButtonsMain = [
    {
      name: "Dashboard",
      iconW: HomeSvg,
      iconB: HomeSvgB,
      route: "/admin/dashboard",
    },
    {
      name: "Yard Management",
      iconW: YardSvg,
      iconB: YardSvgB,
      route: "/admin/yards",
    },

    {
      name: "Inventory Overview",
      iconW: InvtSvg,
      iconB: InvtSvgB,
      route: "/admin/inventory",
    },
    {
      name: "Subscription",
      iconW: SubcSvg,
      iconB: SubSvgB,
      route: "/admin/subscription",
    },
  ];

  return (
    <>
      <div
        className={`${
          showSideBar ? "flex" : "hidden"
        } flex-1  bg-black  xl:flex min-w-[20%] absolute z-10 md:relative h-full md:h-auto flex-col justify-start items-center p-6 space-y-6 overflow-y-auto `}
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
              <Link href={item?.route} key={index}>
                <div
                  onClick={() => {
                    setActiveMainBtn(index);
                    setActiveBottomBtn(-1);
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
              </Link>
            );
          })}
        </div>

        {/* Bottom Part */}
        <div className="w-full flex-1 flex flex-col items-center justify-end ">
          {showBtnsBottom.map((item, index) => {
            return (
              <Link
                href={item?.route}
                key={index}
                onClick={() => {
                  setActiveBottomBtn(index);
                  setActiveMainBtn(-1);
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
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
