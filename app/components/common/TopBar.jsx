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

  // Profile routing based on user type
  const handleProfileClick = () => {
    if (user?.userType === "user") {
      return router.push("/profile/");
    } else if (user?.userType === "employee") {
      return router.push("/profile/employee");
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
          <Image
            // src={user?.data?.profile}
            src={Avatar}
            width={40}
            height={40}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <p className="hidden sm:block text-xs font-bold">{user?.data?.name?.first + " " + user?.data?.name?.last}</p>
          <p className="hidden sm:block text-xs">{user?.userType === 'user' ? 'Shop Owner' : 'Employee'}</p>
        </div>
        <div className="hidden sm:block p-2">
          <Image src={DownArrowIcon} alt="DownArrowIcon" />
        </div>

        {/* Profile Menu */}
        <div
          className={`${
            showProfileMenu ? "block" : "hidden"
          } bg-white z-50 overflow-auto no-scrollbar absolute top-[135%] w-full left-0  rounded-lg border border-gray-300 p-3 flex flex-col justify-start max-h-40`}
        >
          <div
            onClick={handleProfileClick}
            className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
          >
            Profile
          </div>{" "}
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
