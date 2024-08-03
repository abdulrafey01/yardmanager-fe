"use client";
import React, { useEffect } from "react";
import EmployeePage from "../../../../components/employee/EmployeePage";
import { useRouter } from "next/navigation";
import { getCookie, getLocalStorage } from "../../../../helpers/storage";
import CountBlock from "../../../../components/dashboard/CountBlock";
import InvIcon from "../../../../assets/main/60-inv.svg";
import VhcIcon from "../../../../assets/main/61-hc.svg";
import InvoiceIcon from "../../../../assets/main/62-invo.svg";
import EmpIcon from "../../../../assets/main/63-emp.svg";

import { Montserrat } from "next/font/google";
import axios from "axios";
const montserrat = Montserrat({ subsets: ["latin"] });

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);

  const [data, setData] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("fetching data");
      let companyId = JSON.parse(getLocalStorage("companyId"));
      let token =
        (await getCookie("adminToken")) ||
        window?.sessionStorage.getItem("adminToken");
      // console.log(state);
      // console.log(token);
      axios
        .get(
          `https://yardmanager-be.vercel.app/api/analytics/count?company=${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log("response");
          console.log("counts", res.data);
          setData(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    fetchData();
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
            <CountBlock
              title={"Parts"}
              icon={InvIcon}
              count={data?.parts ?? 0}
            />
            <CountBlock
              title={"Vehicles"}
              icon={VhcIcon}
              count={data?.vehicles ?? 0}
            />
            <CountBlock
              title={"Locations"}
              icon={InvoiceIcon}
              count={data?.locations ?? 0}
            />
            <CountBlock
              title={"Employees"}
              icon={EmpIcon}
              count={data?.employees ?? 0}
            />
          </div>
        </div>
      </div>
      <EmployeePage isAdmin={true} />;
    </div>
  );
};

export default page;
