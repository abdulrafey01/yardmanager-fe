import React, { useEffect } from "react";
import Image from "next/image";
import ArrowImg from "../assets/auth/5-Vector.svg";
import { useDispatch, useSelector } from "react-redux";
import { setShowToast } from "../../lib/features/shared/sharedSlice";

const AuthToast = ({ show }) => {
  const { showToast } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showToast.value) {
      setTimeout(() => {
        dispatch(setShowToast({ value: false, msg: "" }));
      }, 2900);
    }
  }, [showToast]);
  return (
    <div
      className={` ${
        showToast.value ? "animate-slideInOut" : "hidden"
      } fixed z-50 top-4 right-4 h-14 w-96  bg-[#c2e8d0] rounded-lg flex justify-start items-center p-4 space-x-2 `}
    >
      <Image src={ArrowImg} alt="logo" />
      <p className="text-sm font-semibold">{showToast.msg}</p>
    </div>
  );
};

export default AuthToast;
