import Image from "next/image";
import React from "react";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
const CountBlock = ({ title, icon, count }) => {
  return (
    <div className="flex-1 min-w-40 flex items-center justify-start  py-2 bg-white border border-gray-300 rounded-xl">
      <Image src={icon} alt="InvIcon" width={70} height={70} />
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-[#6E7793]">{title}</p>
        <p className={`text-xl font-bold ${montserrat.className}`}>{count}</p>
      </div>
    </div>
  );
};

export default CountBlock;
