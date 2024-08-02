"use client";
import React, { useEffect } from "react";
import CreateInvoicePage from "../../../../../components/invoices/CreateInvoicePage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../../helpers/storage";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <CreateInvoicePage isAdmin={true} />;
};

export default page;
