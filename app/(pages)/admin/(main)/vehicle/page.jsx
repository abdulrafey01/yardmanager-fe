"use client";
import React, { useEffect } from "react";
import VehiclePage from "../../../../components/Vehicle/VehiclePage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <VehiclePage isAdmin={true} />;
};

export default page;
