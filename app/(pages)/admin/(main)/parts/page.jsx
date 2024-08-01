"use client";
import React, { useEffect } from "react";
import PartsPage from "../../../../components/parts/PartsPage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";

const page = () => {
  // Don't let admin in without company id bcz there will be no data to display
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <PartsPage isAdmin={true} />;
};

export default page;
