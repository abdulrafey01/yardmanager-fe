"use client";
import React, { useEffect, useState } from "react";
import MainInput from "../../../../components/common/MainInput";

import MsgIcon from "../../../../assets/auth/1-AdornmentEnd.svg";
import PrfIcon from "../../../../assets/main/52-prficon.svg";
import PhoneIcon from "../../../../assets/main/53-phoneicon.svg";
import BasketIcon from "../../../../assets/main/54-basket.svg";
import PaymentIcon from "../../../../assets/main/55-payment.svg";
import SelectIcon from "../../../../assets/main/28-downarrow.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../../../lib/features/shared/sharedSlice";
import GreenBtn from "../../../../abstracts/GreenBtn";
import WhiteBtn from "../../../../abstracts/WhiteBtn";
import DownArrow from "../../../../assets/main/28-downarrow.svg";
import { searchInventoryByName } from "../../../../../lib/features/inventory/inventoryActions";
import ProductDetailRow from "../../../../components/invoices/ProductDetailRow";
import {
  addInvoice,
  updateInvoice,
} from "../../../../../lib/features/invoice/invoiceActions";
import { useRouter } from "next/navigation";
import {
  resetToast,
  setPreviewModal,
} from "../../../../../lib/features/invoice/invoiceSlice";
import Link from "next/link";
import { getLocalStorage } from "../../../../helpers/storage";
const page = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { inventorySearchData, toastMsg: searchToast } = useSelector(
    (state) => state.inventory
  );
  const { error, toastMsg } = useSelector((state) => state.invoice);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [pagePermission, setPagePermission] = React.useState(null);
  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "user") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
      setPagePermission(
        user.data.role.privileges.find(
          (privilege) => privilege.name === "invoices"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);

  // if can't write or update then redirect to invoices
  useEffect(() => {
    if (pagePermission?.write === false && pagePermission?.update === false) {
      router.push("/invoices");
    }
  }, [pagePermission]);

  const router = useRouter();
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (toastMsg) {
      dispatch(setShowToast({ value: true, ...toastMsg }));
    }
    dispatch(resetToast());
  }, [toastMsg]);

  // can use other way when do refactor but for now
  const [pageMode, setPageMode] = useState("add");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    products: [],
    tax: 0,
    paid: 0,
    status: false,
    notes: "",
    datePaid: "",
  });
  // For setting productName
  const [productName, setProductName] = useState("");

  // For setting productData
  const [productData, setProductData] = useState({
    product: "",
    name: "",
    quantity: 0,
    price: 0,
    date: "",
    total: 0,
  });

  // for menu show/hide
  const [showPaymentMenu, setShowPaymentMenu] = useState(false);

  // for payment input value
  const [paymentVal, setPaymentVal] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage("Invoices"));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (searchToast) {
      dispatch(setShowToast({ value: true, ...searchToast }));
    }
  }, [error, searchToast]);

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (JSON.parse(getLocalStorage("invoiceItem"))) {
      setItem(JSON.parse(getLocalStorage("invoiceItem")));
    }
    console.log(formData);
  }, []);

  useEffect(() => {
    console.log("item:", item);
    if (item) {
      setFormData({
        name: item.name,
        email: item.email,
        phone: item.phone,
        products: item.products,
        tax: item.tax,
        paid: item.paid,
        status: item.status,
        notes: item.notes,
        datePaid: item.datePaid,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        products: [],
        tax: 0,
        paid: 0,
        status: false,
        notes: "",
        datePaid: "",
      });
    }
  }, [item]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onProductNameInputChange = (e) => {
    setProductName(e.target.value);
    if (e.target.value.length >= 3) {
      setShowDropdown(true);
      dispatch(searchInventoryByName(e.target.value));
    } else {
      setShowDropdown(false);
    }
  };

  const onProductNameClick = (item) => {
    setProductData({ ...productData, product: item._id, name: item.name });
    setProductName(item.name);
    setShowDropdown(false);
  };

  const onProductDetailInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const onAddProductClick = () => {
    if (
      productName === "" ||
      productData.quantity === "" ||
      productData.price === "" ||
      productData.date === ""
    ) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill all product fields.",
          red: true,
        })
      );
    }
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { ...productData, total: productData.price * productData.quantity }, //setting total price for product
      ],
    });
    setProductData({
      product: "",
      name: "",
      quantity: "",
      price: "",
      date: "",
      total: 0,
    });
    setProductName("");
  };

  // Remove added product
  const onRemoveProductClick = (index) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    console.log(formData);
    setGrandTotal(subTotal + subTotal * (formData.tax / 100));
  }, [subTotal, formData.tax]);

  useEffect(() => {
    if (formData) {
      // Reduce function is used when calculation is required. It is same as map but calculates instead of render
      setSubTotal(
        formData?.products?.reduce((preVal, item) => {
          return (
            preVal + (item.total ? item.total : item.quantity * item.price)
          );
        }, 0)
      );
    }
  }, [formData]);
  // on changing grand total
  useEffect(() => {
    if (grandTotal) {
      setFormData({ ...formData, paid: grandTotal });
    }
  }, [grandTotal]);

  // On form submit
  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!paymentVal) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please select a payment method",
          red: true,
        })
      );
    }

    if (
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      formData.phone.length === 0 ||
      formData.products.length === 0 ||
      formData.tax === 0 ||
      formData.datePaid.length === 0 ||
      formData.paid === 0
    ) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill all the fields",
          red: true,
        })
      );
    }
    if (pageMode === "edit") {
      dispatch(
        updateInvoice({
          formData,
          id: selectedItem._id,
        })
      );
    } else {
      dispatch(addInvoice(formData));
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      products: [],
      tax: 0,
      paid: 0,
      status: false,
      notes: "",
      datePaid: "",
    });
    setProductData({
      product: "",
      name: "",
      quantity: "",
      price: "",
      date: "",
      total: 0,
    });
    setSubTotal(0);
    setGrandTotal(0);

    dispatch(setShowSideMenu({ value: false }));
  };

  const onCancel = () => {
    router.push("/invoices");

    // so that we can go back to invoices page
    dispatch(setShowSideMenu({ value: false }));
  };

  const handlePaymentMenuClick = (val) => {
    setPaymentVal(val);
    setShowPaymentMenu(!showPaymentMenu);
  };

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
        <div
          className={`${
            pageMode === "preview" && "opacity-50 pointer-events-none"
          }  flex flex-col space-y-4  items-center w-full `}
        >
          {/* Customer Container */}
          <div className="w-full flex flex-col space-y-4">
            <p className="font-bold text-[#344054] text-xl">
              Customer Information
            </p>
            {/* Inputs container */}
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:space-x-4">
              <MainInput
                onChange={onInputChange}
                name="name"
                value={formData.name}
                placeholder={"Customer Name"}
                icon={PrfIcon}
              />
              <MainInput
                onChange={onInputChange}
                value={formData.email}
                name="email"
                placeholder={"Customer Email Address"}
                icon={MsgIcon}
              />
              <MainInput
                onChange={onInputChange}
                value={formData.phone}
                name="phone"
                placeholder={"Customer Phone Number"}
                icon={PhoneIcon}
              />
            </div>
          </div>
          {/* Product Container  */}
          <div className="w-full  flex flex-col space-y-4">
            <p className="font-bold text-[#344054] text-xl">Product Details</p>
            {/* Table */}
            <div className="w-full flex flex-col ">
              {/* Head */}
              <div className="hidden lg:flex w-full font-semibold bg-[#78FFB6] border-t border-[#EDEEF2] text-sm  justify-between rounded-t-xl ">
                <p className=" min-w-16 p-4 bg-[#78FFB6] flex-[2] rounded-t-xl">
                  Product Name
                </p>
                <p className=" min-w-16 p-4 bg-[#78FFB6] flex-1">Quantity</p>
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
                    {/* Inventory Name input */}
                    <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                      <input
                        className="w-full outline-none"
                        type="text"
                        value={productName}
                        placeholder="Name"
                        name="name"
                        onChange={onProductNameInputChange}
                        autoComplete="off"
                      />
                      <Image src={DownArrow} alt="downarrow" />
                      {/* Dropdown */}
                      <div
                        className={`${
                          inventorySearchData.length > 0 && showDropdown
                            ? "block"
                            : "hidden"
                        } bg-white overflow-auto no-scrollbar absolute top-[110%] w-full left-0  rounded-lg border border-black p-3 flex flex-col justify-start max-h-40`}
                      >
                        {inventorySearchData.map((item) => {
                          return (
                            <p
                              onClick={() => onProductNameClick(item)}
                              className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                            >
                              {item.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className=" min-w-16 p-4 flex-1 flex items-center">
                    <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                      <input
                        className="w-full outline-none"
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        value={productData.quantity}
                        onChange={onProductDetailInputChange}
                      />
                    </div>
                  </div>
                  <div className=" min-w-16 p-4 flex-1 flex items-center">
                    <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                      <input
                        className="w-full outline-none"
                        type="number"
                        placeholder="Unit Price"
                        name="price"
                        value={productData.price}
                        onChange={onProductDetailInputChange}
                      />
                    </div>
                  </div>
                  <div className=" min-w-16 p-4 flex-1 flex items-center">
                    <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                      <input
                        className="w-full outline-none text-sm"
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={productData.date}
                        onChange={onProductDetailInputChange}
                      />
                    </div>
                  </div>
                  {/* Total input hidden in lg devices */}
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

                  <div
                    onClick={onAddProductClick}
                    className="hidden lg:flex min-w-16 p-4 flex-1 rounded-t-xl cursor-pointer  items-center justify-center"
                  >
                    <div className="flex justify-center items-center p-2 w-20 bg-[#F3F3F3] rounded-lg text-sm">
                      Add New
                    </div>
                  </div>
                </div>
                {/* Row 2 */}
                {formData?.products?.map((product, index) => {
                  return (
                    <ProductDetailRow
                      name={product.name}
                      quantity={product.quantity}
                      price={product.price}
                      date={product.date}
                      total={
                        product.total // as product.total is present when we are adding but not presenting when editing product data shows
                          ? product.total
                          : product.price * product.quantity
                      }
                      key={index}
                      index={index}
                      onRemoveProductClick={onRemoveProductClick}
                    />
                  );
                })}
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
              name="note"
              value={formData.note}
              onChange={onInputChange}
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
              <div className="relative lg:w-2/3 w-full">
                <MainInput
                  className="pr-3"
                  placeholder={"Select Payment Method"}
                  icon={SelectIcon}
                  onChange={() => {
                    setShowPaymentMenu(true);
                  }}
                  onIconClick={() => setShowPaymentMenu(!showPaymentMenu)}
                  value={paymentVal}
                />
                {/* Profile Menu */}
                <div
                  className={`${
                    showPaymentMenu ? "block" : "hidden"
                  } bg-white z-50 overflow-auto no-scrollbar absolute top-[115%] w-full left-0  rounded-lg border border-gray-300 p-3 flex flex-col justify-start max-h-40`}
                >
                  <div
                    onClick={() => handlePaymentMenuClick("Card")}
                    className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Card
                  </div>{" "}
                  <div
                    onClick={() => handlePaymentMenuClick("Cash Payment")}
                    className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Cash Payment
                  </div>
                  <div
                    onClick={() => handlePaymentMenuClick("Bank Transfer")}
                    className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                  >
                    Bank Transfer
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 w-full">
                <MainInput
                  type="date"
                  name={"datePaid"}
                  onChange={onInputChange}
                  placeholder={"Select Payment Method"}
                />
              </div>
            </div>
            <div className="w-full flex-1 flex justify-end  ">
              <div className="flex p-4 flex-col space-y-4 bg-[#fbfbfb] border border-gray-300 rounded-lg">
                {/* Row 1  */}
                <div className="w-full flex justify-between items-center">
                  <p className="text-[#667085]">Enter Tax:</p>
                  <div className="w-2/3">
                    <MainInput
                      type="number"
                      name={"tax"}
                      value={formData.tax}
                      onChange={onInputChange}
                      placeholder={"Tax Percentage %"}
                      icon={PaymentIcon}
                    />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="w-full flex justify-between items-center">
                  <p className="text-[#667085]">Sub Total:</p>

                  <p className="font-bold">{subTotal}</p>
                </div>
                {/* Row 3 */}
                <div className="w-full flex justify-between items-center">
                  <p className="text-[#667085]">Tax Amount:</p>
                  <p className="font-bold">{formData.tax}</p>
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
          </div>
        </div>

        {/* Button Container */}
        <div className="w-full p-4 flex">
          <div
            onClick={onCancel}
            className="flex-1 flex justify-start items-center"
          >
            <p className="font-bold cursor-pointer select-none">Cancel</p>
          </div>
          <div
            className={`flex-1 flex justify-end space-x-4 items-center ${
              pageMode === "preview" && "hidden"
            }`}
          >
            <WhiteBtn
              onClick={() => {
                dispatch(
                  setPreviewModal({
                    value: true,
                    data: {
                      ...formData,
                      grandTotal,
                      subTotal,
                    },
                  })
                );
              }}
              title={"Preview"}
            />
            <GreenBtn onClick={onFormSubmit} title={"Save Invoice"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
