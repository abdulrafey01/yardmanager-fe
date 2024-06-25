import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteRoleModal from "../../components/roles/DeleteRoleModal";
import DeleteInvoiceModal from "../../components/invoices/DeleteInvoiceModal";
import AddRoleMenu from "../../components/roles/AddRoleMenu";
const DeleteModal = () => {
  const dispatch = useDispatch();
  const { deleteInvoiceIndex, showDeleteModal } = useSelector(
    (state) => state.invoice
  );
  return (
    <div>
      <AddRoleMenu />
      <DeleteRoleModal />
      <DeleteInvoiceModal />
    </div>
  );
};

export default DeleteModal;
