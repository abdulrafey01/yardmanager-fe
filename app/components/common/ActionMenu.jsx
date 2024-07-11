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
} from "../../../lib/features/shared/sharedSlice";
import { setShowRestoreModal } from "../../../lib/features/deleted-items/deletedItemsSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addInventory } from "../../../lib/features/inventory/inventoryActions";
import { setLocalStorage } from "../../helpers/storage";

const ActionMenu = ({ index, item, permissions }) => {
  const dispatch = useDispatch();
  const { currentPage, showActionMenu } = useSelector((state) => state.shared);
  const router = useRouter();

  const duplicateInventory = () => {
    console.log(item);

    let formData = new FormData();

    formData.append("name", item?.name);
    formData.append("location", item?.location._id);
    formData.append("part", item?.part._id);
    formData.append("model", item?.model);
    formData.append("make", item?.make);
    formData.append("variant", item?.variant);
    formData.append("notes", item?.notes);
    formData.append("sku", item?.sku);
    formData.append("price", item?.price);
    formData.append("images", item?.images);
    formData.append("startYear", item?.startYear);
    formData.append("lastYear", item?.lastYear);
    formData.append("color", item?.color);

    dispatch(setShowActionMenu(-1));
    dispatch(addInventory(formData));
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
        (currentPage === "Invoices" ? (
          <Link
            href={"/invoices/create"}
            onClick={() => {
              // console.log(permissions);
              dispatch(setSelectedItem(item));
              dispatch(setShowActionMenu(-1));
              setLocalStorage("invoiceItem", item);
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
              dispatch(setSelectedItem(item));
              dispatch(setShowActionMenu(-1));
              dispatch(
                setShowSideMenu({
                  value: true,
                  mode: "edit",
                })
              );
            }}
            className={`cursor-pointer flex justify-center items-center space-x-2 `}
          >
            <Image src={EditIcon} alt="edit" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Edit</p>
          </div>
        ))}
      <Link
        href={"/invoices/create"}
        onClick={() => {
          dispatch(setShowActionMenu(-1));
          dispatch(setSelectedItem(item));

          setLocalStorage("invoiceItem", item);
          // dispatch(
          //   setShowSideMenu({
          //     value: true,
          //     mode: "preview",
          //   })
          // );
        }}
        className="cursor-pointer flex justify-center items-center space-x-2 "
      >
        <Image src={PrevIcon} alt="preview" height={20} width={20} />
        <p className="font-semibold hover:font-bold">Preview</p>
      </Link>
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

      {currentPage === "Inventory" && (
        <>
          <div
            onClick={() => {}}
            className=" flex cursor-pointer justify-center items-center space-x-2 "
          >
            <Image src={CartIcon} alt="delete" height={20} width={20} />
            <p className="font-semibold hover:font-bold">Add to invoice</p>
          </div>
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
    </div>
  );
};

export default ActionMenu;
