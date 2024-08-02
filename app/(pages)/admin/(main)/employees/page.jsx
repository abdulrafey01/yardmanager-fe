"use client";
import React, { useEffect } from "react";

import EmployeePage from "../../../../components/employee/EmployeePage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <EmployeePage isAdmin={true} />;
};

export default page;
