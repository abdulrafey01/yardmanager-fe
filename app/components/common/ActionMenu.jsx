import React from "react";

import EditIcon from "../../assets/main/32-edit.svg";
import PrevIcon from "../../assets/main/33-eye.svg";
import DelIcon from "../../assets/main/34-trash.svg";
import CartIcon from "../../assets/main/42-cart.svg";
import DuplicateIcon from "../../assets/main/43-duplicate.svg";
import RestoreIcon from "../../assets/main/47-restore.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedItem,
  setShowActionMenu,
  setShowDeleteModal,
  setShowSideMenu,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import { setShowRestoreModal } from "../../../lib/features/deleted-items/deletedItemsSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { addInventory } from "../../../lib/features/inventory/inventoryActions";
import { getCookie, setLocalStorage } from "../../helpers/storage";
import { setPreviewModal } from "../../../lib/features/invoice/invoiceSlice";
import {
  addToInventory,
  fetchVehiclesByPage,
} from "../../../lib/features/vehicle/vehicleActions";
import { setShowEmployeeSideMenu } from "../../../lib/features/roles/roleSlice";
import {
  getYardsByPage,
  handleYardActivation,
} from "../../../lib/adminApis/yardApi";
import { fetchYardsByPage } from "../../../lib/features/yards/yardActions";
import axios from "axios";

const ActionMenu = ({ index, item, permissions, fetchYards }) => {
  const dispatch = useDispatch();
  const { currentPage, showActionMenu } = useSelector((state) => state.shared);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathName = usePathname();

  const cancelSubscription = async () => {
    try {
      let token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");

      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/subscription/cancel/" + item.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        setShowToast({
          value: true,
          msg: "Subscription cancelled successfully",
          red: false,
        })
      );
      setTimeout(() => {
        window?.location.reload();
      }, 2000);
    } catch (error) {
      console.log("error", error);
      dispatch(
        setShowToast({
          value: true,
          msg: "Fail to cancel subscription",
          red: true,
        })
      );
    }
  };
  const duplicateInventory = () => {
    console.log("item", item);

    let formData = new FormData();

    if (!item.lastYear) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Last year is required",
          red: true,
        })
      );
    }
    formData.append("name", item?.name);
    formData.append("location", item?.location._id);
    formData.append("part", item?.part._id);

    item?.model.forEach((model, index) => {
      formData.append(`model`, model);
    });

    item?.make.forEach((make, index) => {
      formData.append(`make`, make);
    });

    item?.variant.forEach((variant, index) => {
      formData.append(`variant`, variant);
    });

    formData.append("notes", item?.notes);
    formData.append("sku", item?.sku);
    formData.append("price", item?.price);
    if (item?.images.length > 0) {
      console.log("here 1");
      for (let i = 0; i < item?.images.length; i++) {
        // formDataRef.current.set("images", files[i]);
        formData.append(`images`, item?.images[i]);
      }
    } else {
      console.log("here 2");

      formData.delete("images");
    }
    formData.append("startYear", item?.startYear);
    formData.append("lastYear", item?.lastYear);
    formData.append("color", item?.color);

    dispatch(setShowActionMenu(-1));
    if (user.userType === "admin") {
      dispatch(addInventory({ data: formData, isAdmin: true }));
    } else {
      dispatch(addInventory({ data: formData }));
    }
  };

  const handleCompanyActivation = () => {
    handleYardActivation({
      id: item?._id,
      data: {
        active: item?.active ? false : true,
      },
    })
      .then((res) => {
        if (res.success === true) {
          dispatch(setShowToast({ value: true, msg: res.message }));
          fetchYards(); //fetch yards
        }
      })
      .catch((err) => {
        dispatch(
          setShowToast({
            value: true,
            msg: "Failed to change active status",
            red: true,
          })
        );
      });
  };
  const renderDeletedItemsActionMenu = () => {
    return (
      <div
        className={`bg-white border border-gray-300 ${
          showActionMenu === index ? "block" : "hidden"
        } shadow-lg absolute top-10 left-[-100px] p-3 flex flex-col justify-center items-start z-10 space-y-4 w-40 rounded-lg`}
      >
        {permissions?.update && (
          <div
            onClick={() => {
              dispatch(setSelectedItem(item));
              dispatch(setShowActionMenu(-1));
              dispatch(setShowRestoreModal(true));
            }}
            className="cursor-pointer flex justify-center items-center space-x-2 "
          >
            <Image src={RestoreIcon} alt="edit" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Restore</p>
          </div>
        )}
        {permissions?.delete && (
          <div
            onClick={() => {
              dispatch(setSelectedItem(item));
              dispatch(setShowActionMenu(-1));
              dispatch(setShowDeleteModal(true));
              console.log("deleted");
            }}
            className=" flex cursor-pointer justify-center items-center space-x-2 "
          >
            <Image src={DelIcon} alt="delete" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Delete</p>
          </div>
        )}
      </div>
    );
  };
  return currentPage === "DeletedItems" ? (
    renderDeletedItemsActionMenu()
  ) : (
    <div
      className={`bg-white border border-gray-300 ${
        showActionMenu === index ? "block" : "hidden"
      } shadow-lg absolute top-10 left-[-100px] p-3 flex flex-col justify-center items-start z-10 space-y-4 w-40 rounded-lg`}
    >
      {permissions?.update &&
        (currentPage === "Invoices" || currentPage === "Dashboard" ? (
          <Link
            href={
              user?.userType === "admin"
                ? "/admin/invoices/create"
                : "/invoices/create"
            }
            onClick={() => {
              // console.log(permissions);
              dispatch(setSelectedItem(item));
              dispatch(setShowActionMenu(-1));
              setLocalStorage("invoiceId", item._id);
              // because on navigating this state refreshes on live server, so used local storage

              // dispatch(
              // setShowSideMenu({
              //   value: true,
              //   mode: "edit",
              // })
              // );
            }}
            className={`cursor-pointer flex justify-center items-center space-x-2 `}
          >
            <Image src={EditIcon} alt="edit" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Edit</p>
          </Link>
        ) : (
          <div
            onClick={() => {
              // console.log(permissions);
              if (currentPage === "Employee") {
                dispatch(setSelectedItem(item));
                dispatch(setShowActionMenu(-1));
                dispatch(setShowEmployeeSideMenu(true));
                dispatch(setShowSideMenu({ value: true, mode: "edit" }));
              } else {
                dispatch(setSelectedItem(item));
                dispatch(setShowActionMenu(-1));
                dispatch(
                  setShowSideMenu({
                    value: true,
                    mode: "edit",
                  })
                );
              }
            }}
            className={`cursor-pointer flex justify-center items-center space-x-2 `}
          >
            <Image src={EditIcon} alt="edit" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Edit</p>
          </div>
        ))}
      {pathName === "/admin/subscription-overview" ||
      pathName === "/admin/dashboard" ? (
        <div
          onClick={() => {
            cancelSubscription(item.id);
          }}
          className=" flex cursor-pointer justify-center items-center space-x-2 "
        >
          <Image src={DelIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Cancel</p>
        </div>
      ) : (
        <div
          onClick={() => {
            dispatch(setShowActionMenu(-1));
            dispatch(setSelectedItem(item));

            if (currentPage === "Invoices" || currentPage === "Dashboard") {
              return dispatch(
                setPreviewModal({
                  value: true,
                  data: {
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    products: item.products
                      .filter((obj) => obj.product)
                      .map((obj) => ({
                        name: obj.product.name,
                        quantity: obj.quantity,
                        price: obj.price,
                        date: obj.date,
                      })),
                    tax: item.tax,
                    paid: item.paid,
                    status: item.status,
                    notes: item.notes,
                    datePaid: item.datePaid,
                    paymentMethod: item.paymentMethod,
                  },
                })
              );
            }
            if (currentPage === "Employee") {
              dispatch(setShowEmployeeSideMenu(true));
              dispatch(setShowSideMenu({ value: true, mode: "preview" }));
            } else {
              dispatch(
                setShowSideMenu({
                  value: true,
                  mode: "preview",
                })
              );
            }
          }}
          className="cursor-pointer flex justify-center items-center space-x-2 "
        >
          <Image src={PrevIcon} alt="preview" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Preview</p>
        </div>
      )}

      {permissions?.delete && (
        <div
          onClick={() => {
            dispatch(setSelectedItem(item));
            dispatch(setShowActionMenu(-1));
            dispatch(setShowDeleteModal(true));
            console.log("deleted");
          }}
          className=" flex cursor-pointer justify-center items-center space-x-2 "
        >
          <Image src={DelIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold">Delete</p>
        </div>
      )}
      {currentPage === "Vehicle" && permissions?.write && (
        <div
          onClick={() => {
            dispatch(setSelectedItem(item));
            dispatch(setShowActionMenu(-1));

            if (item.part === null || item.part === "" || !item.part) {
              return dispatch(
                setShowToast({
                  value: true,
                  msg: "Please Fill Part Field from Menu",
                  red: true,
                })
              );
            }
            dispatch(
              addToInventory({
                id: item._id,
                isAdmin: user?.userType === "admin",
              })
            );
            dispatch(
              fetchVehiclesByPage({
                page: 1,
                isAdmin: user?.userType === "admin",
              })
            );
            console.log(item);
          }}
          className=" flex cursor-pointer justify-start items-center space-x-2 "
        >
          <Image src={CartIcon} alt="delete" height={20} width={20} />
          <p className="font-semibold hover:font-bold text-start">
            Add To Inventory
          </p>
        </div>
      )}
      {currentPage === "Inventory" &&
        pathName !== "/admin/inventory-overview" && (
          <>
            {/* <div
            onClick={() => {}}
            className=" flex cursor-pointer justify-center items-center space-x-2 "
          >
            <Image src={CartIcon} alt="delete" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Add to invoice</p>
          </div> */}
            <div
              onClick={() => {
                duplicateInventory(item);
              }}
              className=" flex cursor-pointer justify-center items-center space-x-2 "
            >
              <Image src={DuplicateIcon} alt="delete" height={20} width={20} />
              <p className="font-semibold hover:font-bold">Duplicate</p>
            </div>
          </>
        )}
      {/* Add Overview Menu button in Yards page */}
      {currentPage === "Yards" && (
        <>
          <div
            onClick={() => {
              setLocalStorage("companyId", item._id);
              router.push("/admin/overview");
            }}
            className=" flex cursor-pointer justify-center items-center space-x-2 "
          >
            <Image src={DuplicateIcon} alt="delete" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Overview</p>
          </div>
          <div
            onClick={handleCompanyActivation}
            className=" flex cursor-pointer justify-center items-center space-x-2 "
          >
            <Image
              src={RestoreIcon}
              alt="active/inactive"
              height={20}
              width={20}
            />
            <p className="font-semibold hover:font-bold">
              {item?.active ? "Deactivate" : "Activate"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionMenu;
