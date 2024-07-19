import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import SideMenu from "./SideMenu";
import InvoicePrevModal from "../invoices/InvoicePrevModal";
import ImagePrevModal from "./ImagePrevModal";
const AbsoluteMenusAndModals = () => {
  const dispatch = useDispatch();
  const { deleteInvoiceIndex, showDeleteModal } = useSelector(
    (state) => state.invoice
  );
  return (
    <>
      <SideMenu />
      <Modal />
      {/* Invoice preview Modal */}
      <InvoicePrevModal />
      {/* Image Preview Modal */}
      <ImagePrevModal />
    </>
  );
};

export default AbsoluteMenusAndModals;
