import Image from "next/image";
import React from "react";
import Link from "next/link";

const GreenBtn = ({ icon, title, onClick, route, textCenter }) => {
  return route ? (
    <Link
      href={route}
      className={`select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex space-x-2 ${
        textCenter && "justify-center"
      }`}
    >
      <p className="font-bold text-sm">{title}</p>
      {icon && <Image src={icon} alt="arrowIcon" />}
    </Link>
  ) : (
    <div
      onClick={onClick}
      className={`select-none cursor-pointer py-3 px-4 bg-[#78FFB6] sm:hover:bg-[#37fd93]  text-left rounded-lg flex space-x-2 ${
        textCenter && "justify-center"
      }`}
    >
      <p className="font-bold text-sm">{title}</p>
      {icon && <Image src={icon} alt="arrowIcon" />}
    </div>
  );
};

export default GreenBtn;
