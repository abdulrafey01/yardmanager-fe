"use client";
import React, { useEffect } from "react";
import InventoryPage from "../../../../components/inventory/InventoryPage";
import { getLocalStorage } from "../../../../helpers/storage";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);

  return <InventoryPage isAdmin={true} />;
};

export default page;
