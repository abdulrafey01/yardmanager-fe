import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import SideMenu from "./SideMenu";
const AbsoluteMenusAndModals = () => {
  const dispatch = useDispatch();
  const { deleteInvoiceIndex, showDeleteModal } = useSelector(
    (state) => state.invoice
  );
  return (
    <>
      <SideMenu />
      <Modal />
    </>
  );
};

export default AbsoluteMenusAndModals;
