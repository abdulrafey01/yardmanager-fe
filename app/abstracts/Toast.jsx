"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import ArrowImg from "../assets/auth/5-Vector.svg";
import CrossIcon from "../assets/main/crossicon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  removeToast,
  setShowToast,
} from "../../lib/features/shared/sharedSlice";

const Toast = ({}) => {
  const { showToast } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (showToast.value) {
  //     setTimeout(() => {
  //       dispatch(setShowToast({ value: false, msg: "" }));
  //     }, 2900);
  //   }
  // }, [showToast]);
  useEffect(() => {
    const timers = showToast.map((toast) =>
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 2900)
    );

    // return () => {
    //   timers.forEach((timer) => clearTimeout(timer));
    // };
  }, [showToast, dispatch]);
  return (
    <div className="fixed z-[90] top-4 right-4 space-y-2">
      {showToast.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slideInOut h-14 w-80 min-h-max sm:w-96 ${
            toast.red ? "bg-red-300" : "bg-[#c2e8d0]"
          } rounded-lg flex justify-start items-center p-4 space-x-2`}
        >
          <Image src={toast.red ? CrossIcon : ArrowImg} alt="logo" />
          <p className="text-sm font-semibold">{toast.msg}</p>
        </div>
      ))}
    </div>

    // <div
    //   className={` ${
    //     showToast.value ? "animate-slideInOut" : "hidden"
    //   } fixed z-50 top-4 right-4 h-14 w-80 sm:w-96  ${
    //     showToast.red ? "bg-red-300" : "bg-[#c2e8d0]"
    //   } rounded-lg flex justify-start items-center p-4 space-x-2 `}
    // >
    //   <Image src={showToast.red ? CrossIcon : ArrowImg} alt="logo" />
    //   <p className="text-sm font-semibold">{showToast.msg}</p>
    // </div>
  );
};

export default Toast;
