import React, { useEffect } from "react";
import Header from "../common/Header";
import ProductDetailRow from "./ProductDetailRow";
import MainInput from "../common/MainInput";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import CrossIcon from "../../assets/main/65-close.svg";
import { setPreviewModal } from "../../../lib/features/invoice/invoiceSlice";

const InvoicePrevModal = () => {
  const dispatch = useDispatch();
  const { previewModal } = useSelector((state) => state.invoice);
  const [subTotal, setSubTotal] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);

  const onClose = () => {
    dispatch(setPreviewModal({ value: false }));
  };

  useEffect(() => {
    console.log(previewModal);
    setSubTotal(
      previewModal?.data?.products?.reduce((preVal, item) => {
        return preVal + (item.total ? item.total : item.quantity * item.price);
      }, 0) // initialize the accumulator to 0
    );
  }, [previewModal]);

  useEffect(() => {
    setGrandTotal(subTotal + subTotal * (previewModal?.data?.tax / 100));
  }, [subTotal]);
  return (
    <div
      className={`${
        previewModal.value ? "absolute" : "hidden"
      }   z-20 w-full h-full flex items-center `}
    >
      {/* // Outer Black on whole screen till scroll end */}
      <div className="absolute z-50 bg-black opacity-50 w-full h-full"></div>
      {/* Container equal to screen to middle the modal */}
      <div className="w-full relative z-[60] h-screen flex justify-center items-center">
        {/* Modal */}
        <div className="relative bg-white p-8 w-1/2 flex flex-col gap-4  ">
          {/* First row */}
          <div className="flex justify-between items-center">
            <Header darkType={true} />
            <div className="flex flex-col items-end">
              <p className="font-bold text-lg">INVOICE</p>
              <p>#4527472-20</p>
            </div>
          </div>
          {/* Second row */}
          <div className="flex justify-start items-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm">{previewModal?.data?.name}</p>
              <p className="text-sm">+{previewModal?.data?.phone}</p>
              <p className="text-sm">{previewModal?.data?.email}</p>
            </div>
          </div>
          {/* Third Row */}
          <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center">
            <div className="flex flex-col gap-1">
              <div className="font-bold">Customer Information</div>
              <div>
                <p className="text-sm">Name: {previewModal?.data?.name}</p>
                <p className="text-sm">Email: {previewModal?.data?.email}</p>
                <p className="text-sm">Contact: {previewModal?.data?.phone}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold">Billing And Payment Details</div>
              <div>
                <p className="text-sm">
                  Payment Amount:{previewModal?.data?.paid}
                </p>
                <p className="text-sm">Payment Method:Cash Payment</p>
                <p className="text-sm">Date: {previewModal?.data?.datePaid}</p>
              </div>
            </div>
          </div>
          {/* fOurth Row */}
          <div className="w-full hidden sm:flex   flex-col space-y-4">
            <p className="font-bold text-[#344054] text-xl">Product Details</p>
            {/* Table */}
            <div className="w-full hidden lg:flex flex-col ">
              {/* Head */}
              <div className="flex w-full font-semibold bg-[#D0D5DD] border-t border-[#EDEEF2] text-sm  justify-between rounded-t-xl ">
                <p className=" min-w-16 p-4  bg-[#D0D5DD]  rounded-t-xl">
                  Sr #
                </p>
                <p className=" min-w-16 p-4  bg-[#D0D5DD] flex-1">
                  Product Name
                </p>
                <p className=" min-w-16 p-4  bg-[#D0D5DD] flex-1">Quantity</p>
                <p className=" min-w-16 p-4  bg-[#D0D5DD] flex-1">Unit Price</p>
                <p className=" min-w-16 p-4  bg-[#D0D5DD] flex-1 ">Date</p>
                <p className=" min-w-16 p-4  bg-[#D0D5DD] flex-1 rounded-t-xl">
                  Amount
                </p>
              </div>
              {/* Body */}
              <div className="w-full flex flex-col justify-between border rounded-lg lg:rounded-none border-gray-300 rounded-b-lg">
                {/* Row 2 */}
                {previewModal?.data?.products.map((product, index) => {
                  return (
                    <div className="w-full hidden lg:flex justify-between border-gray-300 border-b">
                      <div className=" min-w-16 p-4  border border-[#EAECF0]  flex items-center">
                        <p className="  px-2 break-all flex-1 flex items-center ">
                          {index + 1}
                        </p>
                      </div>
                      <div className=" min-w-16 p-4 border border-[#EAECF0] flex-1 flex items-center">
                        <p className=" px-2 break-all flex-1  flex items-center justify-start font-bold">
                          {product.name}
                        </p>
                      </div>
                      <div className=" min-w-16 p-4 border border-[#EAECF0] flex-1 flex items-center">
                        <p className=" px-2 break-all flex-1  flex items-center justify-start font-bold">
                          {product.quantity}
                        </p>
                      </div>
                      <div className=" min-w-16 p-4 border border-[#EAECF0] flex-1 flex items-center">
                        <p className=" px-2 break-all flex-1  flex items-center justify-start font-bold">
                          {product.price}
                        </p>
                      </div>
                      <div className=" min-w-16 p-4 border border-[#EAECF0] flex-1 flex items-center">
                        <p className=" px-2 break-all flex-1  flex items-center justify-start font-bold">
                          {product.date}
                        </p>
                      </div>
                      <div className=" min-w-16 p-4 border border-[#EAECF0] flex-1 flex items-center">
                        <p className=" px-2 break-all flex-1  flex items-center justify-start font-bold">
                          {product.quantity * product.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* fIFTH nOTE  Row */}
          <div className="w-full flex flex-col justify-start gap-2">
            <p className="font-semibold text-[#344054] text-xl">
              Additional Note
            </p>
            <p>{previewModal?.data?.notes}</p>
          </div>
          {/* Sixth box row */}
          <div className="flex w-full justify-end">
            <div className="flex w-1/2 p-4 flex-col space-y-4 bg-[#fbfbfb] border border-gray-300 rounded-lg">
              {/* Row 1  */}

              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Enter Tax:</p>
                <p className="font-bold">{previewModal?.data?.tax}</p>
              </div>
              {/* Row 2 */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Sub Total:</p>

                <p className="font-bold">{subTotal}</p>
              </div>
              {/* Row 3 */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Tax Amount:</p>
                <p className="font-bold">{previewModal?.data?.tax}</p>
              </div>
              <hr />
              {/* Row 4 */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Grand Total:</p>
                <p className="font-bold">{grandTotal}</p>
              </div>
              <div></div>
            </div>
          </div>
          {/* Cross icon */}
          <Image
            onClick={onClose}
            src={CrossIcon}
            alt="cross"
            className="cursor-pointer absolute -top-7 -right-9"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoicePrevModal;
