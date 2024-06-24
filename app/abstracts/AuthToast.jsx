import React from "react";
import Image from "next/image";
import ArrowImg from "../assets/auth/5-Vector.svg";

const AuthToast = ({ show }) => {
  return (
    <div
      className={`absolute top-0 right-0 h-14 w-96 ${
        show ? "animate-slideInOut" : "hidden"
      } bg-[#c2e8d0] rounded-lg flex justify-start items-center p-4 space-x-2 `}
    >
      <Image src={ArrowImg} alt="logo" />
      <p className="text-sm font-semibold">
        Your Password Has Been Reset Successfully
      </p>
    </div>
  );
};

export default AuthToast;
