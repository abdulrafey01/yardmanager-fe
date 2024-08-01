"use client";
import React, { useEffect } from "react";
import LocationPage from "../../../../components/locations/LocationPage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <LocationPage isAdmin={true} />;
};

export default page;
