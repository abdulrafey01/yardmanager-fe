"use client";
import React, { useEffect } from "react";
import MainInput from "../../../../components/common/MainInput";

import MsgIcon from "../../../../assets/auth/1-AdornmentEnd.svg";
import PrfIcon from "../../../../assets/main/52-prficon.svg";
import PhoneIcon from "../../../../assets/main/53-phoneicon.svg";
import BasketIcon from "../../../../assets/main/54-basket.svg";
import PaymentIcon from "../../../../assets/main/55-payment.svg";
import SelectIcon from "../../../../assets/main/28-downarrow.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../../lib/features/shared/sharedSlice";
import GreenBtn from "../../../../abstracts/GreenBtn";
import WhiteBtn from "../../../../abstracts/WhiteBtn";
const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage("Invoices"));
  }, [dispatch]);
  return (
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
      {/* Main container */}
      <div className="w-full bg-white flex flex-col p-4 rounded-lg space-y-8">
        <div className=" flex flex-col space-y-4">
          <p className="font-semibold text-xl">Invoice Detail</p>
          <p className="text-sm text-gray-500 ">
            Streamline your invoicing with our easy-to-use invoice generator!
          </p>
          <hr />
        </div>
        {/* Customer Container */}
        <div className="w-full flex flex-col space-y-4">
          <p className="font-bold text-[#344054] text-xl">
            Customer Information
          </p>
          {/* Inputs container */}
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:space-x-4">
            <MainInput placeholder={"Customer Name"} icon={PrfIcon} />
            <MainInput placeholder={"Customer Email Address"} icon={MsgIcon} />
            <MainInput placeholder={"Customer Phone Number"} icon={PhoneIcon} />
          </div>
        </div>
        {/* Product Container */}
        <div className="w-full  flex flex-col space-y-4">
          <p className="font-bold text-[#344054] text-xl">Product Details</p>
          {/* Table */}
          <div className="w-full flex flex-col ">
            {/* Head */}
            <div className="hidden lg:flex w-full font-semibold bg-[#78FFB6] border-t border-[#EDEEF2] text-sm  justify-between rounded-t-xl ">
              <p className=" min-w-16 p-4 bg-[#78FFB6] flex-[2] rounded-t-xl">
                Product Name
              </p>
              <p className=" min-w-16 p-4 bg-[#78FFB6] flex-1">Quality</p>
              <p className=" min-w-16 p-4 bg-[#78FFB6] flex-1">Unit Price</p>
              <p className=" min-w-16 p-4 bg-[#78FFB6] flex-1">Date</p>
              <p className=" min-w-16 p-4 bg-[#78FFB6] flex-1 text-center">
                Total
              </p>
              <p className=" min-w-16 p-4 bg-[#78FFB6] flex-1 rounded-t-xl text-center">
                Action
              </p>
            </div>
            {/* Body */}
            <div className="w-full flex flex-col justify-between border rounded-lg lg:rounded-none border-gray-300 rounded-b-lg">
              {/* Row 1 */}
              <div className="w-full flex-col lg:flex-row lg:flex justify-between border-gray-300 border-b">
                <div className=" min-w-16 p-4 flex-[2] rounded-t-xl flex items-center">
                  <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                    <input
                      className="w-full outline-none"
                      type="text"
                      placeholder=" Name"
                    />
                  </div>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                    <input
                      className="w-full outline-none"
                      type="text"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                    <input
                      className="w-full outline-none"
                      type="text"
                      placeholder="Unit Price"
                    />
                  </div>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                    <input
                      className="w-full outline-none text-sm"
                      type="date"
                    />
                  </div>
                </div>
                {/* Total inout hidden in lg devices */}
                <div className="lg:hidden min-w-16 p-4 flex-1 flex items-center">
                  <div className=" w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                    <input
                      className="w-full outline-none text-sm"
                      type="text"
                      placeholder="Total"
                    />
                  </div>
                </div>
                <div className="lg:hidden min-w-16 p-4 flex-1 flex items-center">
                  <div className=" w-full p-3 bg-black text-white flex hover:bg-gray-700 justify-center items-center rounded-lg cursor-pointer border border-[#D0D5DD]">
                    Add
                  </div>
                </div>
                <p className="hidden lg:flex min-w-16 p-2 flex-1 font-bold  items-center justify-center">
                  Total $
                </p>

                <div className="hidden lg:flex min-w-16 p-4 flex-1 rounded-t-xl  items-center justify-center">
                  <div className="flex justify-center items-center p-2 w-20 bg-[#F3F3F3] rounded-lg text-sm">
                    Add New
                  </div>
                </div>
              </div>
              {/* Row 2 */}
              <div className="w-full hidden lg:flex justify-between border-gray-300 border-b">
                <div className=" min-w-16 p-4 flex-[2] rounded-t-xl flex items-center">
                  <p className=" min-w-16 p-2 flex-1 flex items-center justify-center">
                    Bugatti W16 engine is a quad-turbocharged, W16s
                  </p>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
                    09
                  </p>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
                    $32839
                  </p>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
                    24/07/2024
                  </p>
                </div>
                <p className=" min-w-16 p-2 flex-1 font-bold flex items-center justify-center">
                  $888393.00
                </p>
                <div className=" min-w-16 p-4 flex-1 rounded-t-xl flex items-center justify-center">
                  <Image src={BasketIcon} alt="delete" />
                </div>
              </div>
              {/* Row 3 */}
              <div className="w-full hidden lg:flex justify-between">
                <div className=" min-w-16 p-4 flex-[2] rounded-t-xl flex items-center">
                  <p className=" min-w-16 p-2 flex-1 flex items-center justify-center">
                    Bugatti W16 engine is a quad-turbocharged, W16s
                  </p>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
                    09
                  </p>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
                    $32839
                  </p>
                </div>
                <div className=" min-w-16 p-4 flex-1 flex items-center">
                  <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
                    24/07/2024
                  </p>
                </div>
                <p className=" min-w-16 p-2 flex-1 font-bold flex items-center justify-center">
                  $888393.00
                </p>
                <div className=" min-w-16 p-4 flex-1 rounded-t-xl flex items-center justify-center">
                  <Image src={BasketIcon} alt="delete" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Note Container */}
        <div className="w-full flex flex-col space-y-4">
          <p className="font-bold text-[#344054] text-xl">
            Add a Note (Optional)
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 max-h-80 min-h-40 outline-none hover:border-gray-500"
            placeholder="Add a personal note to the invoice"
          />
        </div>
        {/* Payment Details Container */}
        <div className="w-full flex flex-col justify-center items-start space-y-4 lg:flex-row lg:space-y-0  ">
          <div className="w-full flex-1 flex flex-col  space-y-4 ">
            <p className="font-bold text-[#344054] text-xl">
              Billing and Payment Details
            </p>
            <div className="lg:w-2/3 w-full">
              <MainInput placeholder={"Payment Amount"} icon={PaymentIcon} />
            </div>
            <div className="lg:w-2/3 w-full">
              <MainInput
                placeholder={"Select Payment Method"}
                icon={SelectIcon}
              />
            </div>

            <div className="lg:w-2/3 w-full">
              <MainInput type="date" placeholder={"Select Payment Method"} />
            </div>
          </div>
          <div className="w-full flex-1 flex justify-end  ">
            <div className="flex p-4 flex-col space-y-4 bg-[#fbfbfb] border border-gray-300 rounded-lg">
              {/* Row 1  */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Enter Tax:</p>
                <div className="w-2/3">
                  <MainInput
                    placeholder={"Tax Percentage %"}
                    icon={PaymentIcon}
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Sub Total:</p>
                <p className="font-bold">$9828</p>
              </div>
              {/* Row 3 */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Tax Amount:</p>
                <p className="font-bold">$92</p>
              </div>
              <hr />
              {/* Row 4 */}
              <div className="w-full flex justify-between items-center">
                <p className="text-[#667085]">Grand Total:</p>
                <p className="font-bold">$69807</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        {/* Button Container */}
        <div className="w-full p-4 flex">
          <div className="flex-1 flex justify-start items-center">
            <p className="font-bold cursor-pointer select-none">Cancel</p>
          </div>
          <div className="flex-1 flex justify-end space-x-4 items-center">
            <WhiteBtn title={"Preview"} />
            <GreenBtn title={"Save Invoice"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
