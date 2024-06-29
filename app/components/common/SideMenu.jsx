"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import InventorySideMenu from "../inventory/InventorySideMenu";
import PartSideMenu from "../parts/PartSideMenu";
import LocationSideMenu from "../locations/LocationSideMenu";
import RoleSideMenu from "../roles/RoleSideMenu";
const SideMenu = () => {
  const { currentPage } = useSelector((state) => state.shared);

  const dispatch = useDispatch();

  return currentPage === "Parts" ? (
    <PartSideMenu />
  ) : currentPage === "Inventory" ? (
    <InventorySideMenu />
  ) : currentPage === "Locations" ? (
    <LocationSideMenu />
  ) : (
    <RoleSideMenu />
  );
};

export default SideMenu;
