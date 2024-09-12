"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import SearchIcon from "../../assets/main/30-search.svg";
import MenuIcon from "../../assets/main/37-menu.svg";
import { calcTotalPage, displayData } from "../../helpers/pagination";

import PlusIcon from "../../assets/main/29-plus.svg";
import DownArrow from "../../assets/main/28-downarrow.svg";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../components/common/TableHead";
import TableRow from "../../components/common/TableRow";
import "../../styles.css";
import {
  setCurrentPage,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import { useRouter } from "next/navigation";
import { fetchInvoicesByPage } from "../../../lib/features/invoice/invoiceActions";
import { getLocalStorage, removeLocalStorage } from "../../helpers/storage";
import Footer from "../../components/common/Footer";
import { resetInvoiceToast } from "../../../lib/features/invoice/invoiceSlice";

const InvoicePage = ({ isAdmin = false }) => {
  const { error, invoiceData, toastMsg, totalDataLength } = useSelector(
    (state) => state.invoice
  );
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataLimit, setDataLimit] = React.useState(10);

  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [pagePermission, setPagePermission] = React.useState(null);

  useEffect(() => {
    dispatch(setCurrentPage("Invoices"));
    dispatch(
      fetchInvoicesByPage({
        page: pageNumber,
        limit: dataLimit,
        search: searchInputValue,
        isAdmin,
      })
    );
  }, [dispatch, pageNumber]);
  // Get page permission
  useEffect(() => {
    // console.log("user", user);

    if (user) {
      if (user?.userType === "admin") {
        setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      } else {
        if (user?.subscription) {
          if (user?.userType === "user") {
            setPagePermission({
              read: true,
              write: true,
              update: true,
              delete: true,
            });
          } else {
            setPagePermission(
              user?.data?.role?.privileges?.find(
                (privilege) => privilege.name === "invoices"
              )?.permissions
            );
          }
        } else {
          setPagePermission({
            read: false,
            write: false,
            update: false,
            delete: false,
          });
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      // console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (invoiceData) {
      setDataFromServer(invoiceData);
      let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      setTotalPage(totalPage);
    }
  }, [invoiceData, dataLimit]);

  useEffect(() => {
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, ...toastMsg }));
      }
    }
    dispatch(resetInvoiceToast());
  }, [toastMsg]);
  // Search function
  const handleSearch = (e) => {
    setPageNumber(1);
    setSearchInputValue(e.target.value);
    dispatch(
      fetchInvoicesByPage({
        page: 1,
        limit: dataLimit,
        search: e.target.value,
        isAdmin,
      })
    );
  };

  useEffect(() => {
    //  for cleaning old data
    if (getLocalStorage("invoiceId")) {
      removeLocalStorage("invoiceId");
    }
  }, []);

  const handleRadioClick = (e) => {
    if (e.target.value == 25) {
      dispatch(fetchInvoicesByPage({ page: 1, limit: 25, isAdmin }));
      setDataLimit(25);
      setPageNumber(1);
    } else if (e.target.value == 50) {
      dispatch(fetchInvoicesByPage({ page: 1, limit: 50, isAdmin }));
      setDataLimit(50);
      setPageNumber(1);
    } else {
      dispatch(fetchInvoicesByPage({ page: 1, limit: 10, isAdmin }));
      setDataLimit(10);
      setPageNumber(1);
    }
    setSearchInputValue("");
  };
  // on Close menu if no error
  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(fetchInvoicesByPage({ page: 1, limit: dataLimit, isAdmin }));
      setPageNumber(1);
    }
  }, [toastMsg]);
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative min-h-[60rem] flex flex-col space-y-4 w-screen md:w-full ">
        <div className="flex items-center justify-between  w-full p-2">
          <p className="font-bold text-lg">Manage Invoices</p>
          {/* Create Button */}
          {pagePermission?.write && (
            <div
              onClick={() => {
                isAdmin
                  ? router.push("/admin/invoices/create")
                  : router.push("/invoices/create");
              }}
              className="cursor-pointer bg-[#78FFB6] hover:bg-[#37fd93] p-3 text-left rounded-lg flex space-x-2"
            >
              <p className="font-bold text-sm">Create Invoice</p>
              <Image src={PlusIcon} alt="arrowIcon" />
            </div>
          )}
        </div>
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-4 w-full gap-2 rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Invoices List
            </p>
            <p className="sm:hidden font-bold text-lg md:text-2xl">Invoices</p>
            {/* Search abd filter input container*/}
            <div className="flex  space-x-2 sm:space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent"
                  value={searchInputValue}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className="overflow-x-auto sm:overflow-visible">
            {/* Head */}
            <TableHead
              titles={[
                "User Name",
                "Invoice #",
                "Customer Name",
                "Email Address",
                "Grand Total",
                "Order Date",
                "Status",
              ]}
            />
            {/* Body */}
            {dataFromServer.length == 0 && (
              <div className="text-center p-8 font-semibold">
                No Data Available
              </div>
            )}
            {dataFromServer.map((data, index) => (
              <TableRow
                titles={[
                  data.name,
                  data._id,
                  data.name,
                  data.email,
                  (() => {
                    let subTotal = data.products.reduce((acc, product) => {
                      return acc + product.quantity * product.price;
                    }, 0);
                    return subTotal + (data.tax * subTotal) / 100;
                  })(),

                  new Date(data.datePaid).toLocaleDateString(),
                  data.status,
                ]}
                key={index}
                rowIndex={index}
                item={data}
                permissions={pagePermission}
              />
            ))}
          </div>
          {/* Footer */}
          <Footer
            totalPage={totalPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleRadioClick={handleRadioClick}
          />
        </div>
      </div>
    )
  );
};

export default InvoicePage;
