"use client";
import React, { useEffect } from "react";
import RolesPage from "../../../../components/roles/RolesPage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <RolesPage isAdmin={true} />;
};

export default page;
