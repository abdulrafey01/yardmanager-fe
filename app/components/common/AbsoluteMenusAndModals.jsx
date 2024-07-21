import React from "react";
import Modal from "./Modal";
import SideMenu from "./SideMenu";
import InvoicePrevModal from "../invoices/InvoicePrevModal";
import ImagePrevModal from "./ImagePrevModal";
import EmployeeSideMenu from "../employee/EmployeeSideMenu";
const AbsoluteMenusAndModals = () => {
  return (
    <>
      <SideMenu />
      {/* Separate bcz used in other page also */}
      <EmployeeSideMenu />
      <Modal />
      {/* Invoice preview Modal */}
      <InvoicePrevModal />
      {/* Image Preview Modal */}
      <ImagePrevModal />
    </>
  );
};

export default AbsoluteMenusAndModals;
