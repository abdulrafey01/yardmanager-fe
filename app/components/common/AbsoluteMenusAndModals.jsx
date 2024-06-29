import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleModal from "../roles/RoleModal";
import LocationModal from "../locations/LocationModal";
import DeleteInvoiceModal from "../invoices/DeleteInvoiceModal";
import AddRoleMenu from "../roles/SideRoleMenu";
import SideMenu from "./SideMenu";
const AbsoluteMenusAndModals = () => {
  const dispatch = useDispatch();
  const { deleteInvoiceIndex, showDeleteModal } = useSelector(
    (state) => state.invoice
  );
  return (
    <>
      <AddRoleMenu />
      <SideMenu />
      <RoleModal />
      <LocationModal />
      <DeleteInvoiceModal />
    </>
  );
};

export default AbsoluteMenusAndModals;
