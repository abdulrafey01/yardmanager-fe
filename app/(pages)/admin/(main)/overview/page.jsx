"use client";
import React, { useEffect } from "react";
import EmployeePage from "../../../../components/employee/EmployeePage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";
import CountBlock from "../../../../components/dashboard/CountBlock";
import CarIcon from "../../../../assets/main/88-car.svg";
import InvIcon from "../../../../assets/main/89-inv.svg";
import EmpIcon from "../../../../assets/main/90-emp.svg";
import LocIcon from "../../../../assets/main/91-loc.svg";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return (
    <div>
      <div className="pt-6 px-4 bg-[#f9fafb]">
        {/* First container */}
        <div className="w-full bg-white flex flex-col items-start justify-start  p-4 rounded-xl gap-6 border border-gray-300">
          {/* Container for Text and filter btn */}
          <div className="flex justify-between items-center w-full">
            <p
              className={`font-bold text-base  ${montserrat.className} tracking-wider`}
            >
              Overall Summary
            </p>
            {/* <div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
            <p>Filter</p>
            <Image src={MenuIcon} alt="MenuIcon" />
          </div> */}
          </div>
          {/* 4 BLocks container */}
          <div className="flex w-full justify-between items-center gap-5 flex-wrap">
            <CountBlock title={"Vehicles"} icon={CarIcon} count={0} />
            <CountBlock title={"Inventory"} icon={InvIcon} count={0} />
            <CountBlock title={"Employees"} icon={EmpIcon} count={0} />
            <CountBlock title={"Active Locations"} icon={LocIcon} count={0} />
          </div>
        </div>
      </div>
      <EmployeePage isAdmin={true} />;
    </div>
  );
};

export default page;
