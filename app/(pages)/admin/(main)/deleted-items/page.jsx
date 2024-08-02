"use client";
import React, { useEffect } from "react";
import DeletedItemsPage from "../../../../components/deleted-items/DeletedItemsPage";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../../../../helpers/storage";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(getLocalStorage("companyId"))) {
      router.back();
    }
  }, []);
  return <DeletedItemsPage isAdmin={true} />;
};

export default page;
