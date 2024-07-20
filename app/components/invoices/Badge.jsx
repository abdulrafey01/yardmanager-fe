import React from "react";
import { useSelector } from "react-redux";

const Badge = ({ received, active }) => {
  const { currentPage } = useSelector((state) => state.shared);
  return currentPage === "Invoices" || currentPage === "Dashboard" ? (
    <div
      className={`w-24 rounded-full ${
        received ? "bg-[#ecfdf3] " : "bg-[#fff4ed]"
      } p-1 flex justify-center items-center space-x-1`}
    >
      <div
        className={`h-1.5 w-1.5 rounded-full ${
          received ? "bg-[#027A48]" : "bg-[#68200c]"
        }`}
      ></div>
      <p
        className={`${
          received ? "text-[#027A48]" : "text-[#68200c]"
        } font-semibold text-sm`}
      >
        {received ? "Received" : "Pending"}
      </p>
    </div>
  ) : (
    <div className="flex justify-center items-center space-x-1">
      <div
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-[#12B76A]" : "bg-[#FE1100]"
        }`}
      ></div>
      <p
        className={`${
          active ? "text-[#027A48]" : "text-[#FE1100]"
        } font-semibold text-sm`}
      >
        {active ? "Active" : "InActive"}
      </p>
    </div>
  );
};

export default Badge;
