"use client";
import React, { useEffect } from "react";
import InventoryPage from "../../../../components/inventory/InventoryPage";
const page = () => {
  return <InventoryPage isAdmin={true} totalOverview={true} />;
};

export default page;
