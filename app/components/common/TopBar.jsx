import React from "react";
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

const TopBar = () => {
  const { currentPage, showSideBar } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const renderPathText = () => {
    if (pathname === "/invoices/create") {
      return <p className="text-[#4A5578] ">Create Invoice</p>;
    } else {
      return null;
    }
  };

  const handleClick = () => {
    switch (currentPage) {
      case "Invoices": {
        return router.push("/invoices");
      }
      default:
        break;
    }
  };
  return (
    <div className="w-full bg-white p-3 flex justify-between items-center">
      {/* Breadcrumbs container */}
      <div className="hidden xl:flex space-x-2 ">
        <p onClick={handleClick} className="text-[#4A5578] cursor-pointer">
          {currentPage}
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
        className="flex relative space-x-2 justify-center items-center cursor-pointer select-none"
      >
        <div>
          <Image src={Avatar} alt="avatar" />
        </div>
        <div className="flex flex-col">
          <p className="hidden sm:block text-xs font-bold">Noraiz Shahid</p>
          <p className="hidden sm:block text-xs">Shop Owner</p>
        </div>
        <div className="hidden sm:block p-2">
          <Image src={DownArrowIcon} alt="DownArrowIcon" />
        </div>

        {/* Profile Menu */}
        <div
          className={`${
            showProfileMenu ? "block" : "hidden"
          } bg-white z-50 overflow-auto no-scrollbar absolute top-[110%] w-full left-0  rounded-lg border border-gray-300 p-3 flex flex-col justify-start max-h-40`}
        >
          <div
            onClick={() => {
              dispatch(logout());
            }}
            className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
          >
            Logout
          </div>
          <div
            onClick={() => router.push("/profile")}
            className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
          >
            Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
