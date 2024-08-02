"use client";
import React, { useEffect } from "react";
import InvoicePage from "../../../../components/invoices/InvoicePage";
import { getLocalStorage } from "../../../../helpers/storage";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <InvoicePage isAdmin={true} />;
};

export default page;
