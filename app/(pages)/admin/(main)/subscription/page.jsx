"use client";
import React, { useEffect } from "react";
import SubscriptionPage from "../../../../components/subscription/SubscriptionPage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <SubscriptionPage isAdmin={true} />;
};

export default page;
