import React from "react";
import ArrowIcon from "../../assets/main/26-arrow.svg";
import Avatar from "../../assets/main/27-avatar.svg";
import DownArrowIcon from "../../assets/main/28-downarrow.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

const TopBar = () => {
  const { currentPage } = useSelector((state) => state.shared);
  const router = useRouter();
  const pathname = usePathname();

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
      <div className="hidden md:flex space-x-2 ">
        <p onClick={handleClick} className="text-[#4A5578] cursor-pointer">
          {currentPage}
        </p>
        <Image src={ArrowIcon} alt="arrowIcon" />
        {renderPathText()}
      </div>
      {/* Avatar and text container */}
      <div
        onClick={() => router.push("/profile")}
        className="flex space-x-2 justify-center items-center cursor-pointer select-none"
      >
        <div>
          <Image src={Avatar} alt="avatar" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Noraiz Shahid</p>
          <p className="text-xs">Shop Owner</p>
        </div>
        <div className="p-2">
          <Image src={DownArrowIcon} alt="DownArrowIcon" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
