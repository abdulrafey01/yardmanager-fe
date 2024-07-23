"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import InventorySideMenu from "../inventory/InventorySideMenu";
import PartSideMenu from "../parts/PartSideMenu";
import LocationSideMenu from "../locations/LocationSideMenu";
import RoleSideMenu from "../roles/RoleSideMenu";
import VehicleSideMenu from "../Vehicle/VehicleSideMenu";
import EmployeeSideMenu from "../employee/EmployeeSideMenu";
import SubscriptionSideMenu from "../subscription/SubscriptionSideMenu";

// Admin panel
import YardSideMenu from "../admin/yards/YardSideMenu";
import UserSideMenu from "../admin/users/UserSideMenu";
import SubscriptionAdminSideMenu from "../admin/subscription/SubscriptionAdminSideMenu";

const SideMenu = () => {
  const { currentPage } = useSelector((state) => state.shared);
  const { showEmployeeSideMenu } = useSelector((state) => state.roles);

  return currentPage === "Parts" ? (
    <PartSideMenu />
  ) : currentPage === "Inventory" ? (
    <InventorySideMenu />
  ) : currentPage === "Locations" ? (
    <LocationSideMenu />
  ) : currentPage === "Vehicle" ? (
    <VehicleSideMenu />
  ) : currentPage === "Employee" ? ( // this extra var bcz this menu used in other page also
    <EmployeeSideMenu />
  ) : currentPage === "Roles" ? (
    <RoleSideMenu />
  ) : currentPage === "Subscription" ? (
    <SubscriptionSideMenu />
  ) : // Admin panel
  currentPage === "Yards" ? (
    <YardSideMenu />
  ) : currentPage === "Users" ? (
    <UserSideMenu />
  ) : currentPage === "SubscriptionAdmin" ? (
    <SubscriptionAdminSideMenu />
  ) : null;
};

export default SideMenu;
