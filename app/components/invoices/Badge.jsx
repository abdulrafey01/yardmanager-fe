import React from "react";

const Badge = ({ received }) => {
  return (
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
  );
};

export default Badge;
