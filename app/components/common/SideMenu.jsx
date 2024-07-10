"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import InventorySideMenu from "../inventory/InventorySideMenu";
import PartSideMenu from "../parts/PartSideMenu";
import LocationSideMenu from "../locations/LocationSideMenu";
import RoleSideMenu from "../roles/RoleSideMenu";
import VehicleSideMenu from "../Vehicle/VehicleSideMenu";
import EmployeeSideMenu from "../employee/EmployeeSideMenu";
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
  ) : currentPage === "Employee" || showEmployeeSideMenu === true ? (
    <EmployeeSideMenu />
  ) : currentPage === "Roles" ? (
    <RoleSideMenu />
  ) : null;
};

export default SideMenu;
