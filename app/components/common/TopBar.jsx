import React, { useEffect } from "react";
import ArrowIcon from "../../assets/main/26-arrow.svg";
import Avatar from "../../assets/main/27-avatar.svg";
import DownArrowIcon from "../../assets/main/28-downarrow.svg";
import BurgerIcon from "../../assets/main/57-burger.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { setShowSideBar } from "../../../lib/features/shared/sharedSlice";
import Header from "./Header";
import { logout } from "../../../lib/features/auth/authSlice";
import Link from "next/link";

import PrfIcon from "../../assets/main/87-avatar.svg";
import { removeLocalStorage } from "../../helpers/storage";

const TopBar = () => {
  const { currentPage, showSideBar } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const data = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User Logged in");
    console.log(data);
  }, [data, router]);

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  // Mainly for admin
  const renderPageName = () => {
    switch (currentPage) {
      case "Yards":
        return "Yards Management";
      case "InventoryAdmin":
        return "Inventory Management";
      case "InventoryAdmin":
        return "Inventory Management";
      case "SubscriptionAdmin":
        return "Subscription Management";
      default:
        return currentPage;
    }
  };
  const renderPathText = () => {
    if (pathname === "/invoices/create") {
      return <p className="text-[#4A5578] ">Create Invoice</p>;
    } else if (pathname === "/subscription/my-plans") {
      return <p className="text-[#4A5578] ">My Plans</p>;
    } else {
      return null;
    }
  };

  // Only for these two bcz only they are further inner pages
  const handleClick = () => {
    switch (currentPage) {
      case "Invoices": {
        return router.push("/invoices");
      }
      case "Subscription": {
        return router.push("/subscription");
      }
      default:
        break;
    }
  };

  // Profile routing based on user type
  const handleProfileClick = () => {
    if (user?.userType === "user") {
      return "/profile";
    } else if (user?.userType === "employee") {
      return "/profile/employee";
    }
    return "/"; // Default route in case userType is undefined or does not match
  };
  return (
    <div className="w-full bg-white p-3 flex justify-between items-center">
      {/* Breadcrumbs container */}
      <div className="hidden xl:flex space-x-2 ">
        <p onClick={handleClick} className="text-[#4A5578] cursor-pointer">
          {renderPageName()}
        </p>
        <Image src={ArrowIcon} alt="arrowIcon" />
        {renderPathText()}
      </div>
      {/* Burger Icon container */}
      <div
        onClick={() => dispatch(setShowSideBar(!showSideBar))}
        className="xl:hidden flex cursor-pointer "
      >
        <Image src={BurgerIcon} alt="burgerIcon" />
      </div>
      {/* Header */}
      <div className="xl:hidden">
        <Header darkType={true} />
      </div>
      {/* Avatar and text container */}
      <div
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        onBlur={() =>
          setTimeout(() => {
            setShowProfileMenu(false);
          }, 200)
        }
        tabIndex={0}
        className="flex relative   space-x-2 justify-center items-center cursor-pointer select-none"
      >
        <div className="w-12 h-12">
          <Image
            // src={user?.data?.profile}
            src={user?.data?.profile ? user?.data?.profile : PrfIcon}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="hidden sm:block text-xs font-bold">
            {user?.data?.name?.first
              ? user?.data?.name?.first
              : "" + " " + user?.data?.name?.last
              ? user?.data?.name?.last
              : ""}
          </p>
          <p className="hidden sm:block text-xs">
            {user?.userType === "user" ? "Shop Owner" : "Employee"}
          </p>
        </div>
        <div className="hidden sm:block p-2">
          <Image src={DownArrowIcon} alt="DownArrowIcon" />
        </div>

        {/* Profile Menu */}
        <div
          className={`${
            showProfileMenu ? "block" : "hidden"
          } bg-white z-50 overflow-auto no-scrollbar absolute top-[135%] w-[100px] sm:w-full  -left-20 sm:left-0  rounded-lg border border-gray-300 p-3 flex flex-col justify-start max-h-40`}
        >
          <Link
            href={handleProfileClick()}
            className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
          >
            Profile
          </Link>{" "}
          <div
            onClick={() => {
              dispatch(logout());
            }}
            className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
