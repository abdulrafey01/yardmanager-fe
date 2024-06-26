import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleModal from "../roles/RoleModal";
import DeleteInvoiceModal from "../invoices/DeleteInvoiceModal";
import AddRoleMenu from "../roles/SideRoleMenu";
const AbsoluteMenusAndModals = () => {
  const dispatch = useDispatch();
  const { deleteInvoiceIndex, showDeleteModal } = useSelector(
    (state) => state.invoice
  );
  return (
    <>
      <AddRoleMenu />
      <RoleModal />
      <DeleteInvoiceModal />
    </>
  );
};

export default AbsoluteMenusAndModals;
