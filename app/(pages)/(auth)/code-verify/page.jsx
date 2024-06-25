"use client";
import React from "react";

import AuthButton from "../../../components/auth/common/AuthButton";
import { useRouter } from "next/navigation";
const page = () => {
  function maxLengthCheck(object) {
    if (object.value.length > 1) object.value = object.value.slice(0, 1);
  }

  const router = useRouter();
  return (
    <div className="flex-1 flex justify-center items-center">
      {/* Main container */}
      <div className="w-72 sm:w-96 space-y-8">
        {/* Text Container */}
        <div className="flex flex-col space-y-2 ">
          <p className="font-bold text-xl sm:text-3xl">Enter Code Received</p>
          <p className="text-sm text-[#9CA3AF]">
            Enter your email or mobile number associated with podium account and
            we’ll send you a temporary access code!
          </p>
        </div>
        {/* Code Boxes container */}
        <div className="flex justify-between items-center">
          {/* Code Box */}
          <div className="w-16 h-16 bg-white border-[#D0D5DD] border-2 rounded-lg">
            <input
              onChange={(e) => maxLengthCheck(e.target)}
              type="number"
              className="w-full h-full text-center outline-none text-3xl"
              placeholder="0"
            />
          </div>
          {/* Code Box */}
          <div className="w-16 h-16 bg-white border-[#D0D5DD] border-2 rounded-lg">
            <input
              onChange={(e) => maxLengthCheck(e.target)}
              type="number"
              className="w-full h-full text-center outline-none text-3xl"
              placeholder="0"
            />
          </div>
          {/* Code Box */}
          <div className="w-16 h-16 bg-white border-[#D0D5DD] border-2 rounded-lg">
            <input
              onChange={(e) => maxLengthCheck(e.target)}
              type="number"
              className="w-full h-full text-center outline-none text-3xl"
              placeholder="0"
            />
          </div>
          {/* Code Box */}
          <div className="w-16 h-16 bg-white border-[#D0D5DD] border-2 rounded-lg">
            <input
              onChange={(e) => maxLengthCheck(e.target)}
              type="number"
              className="w-full h-full text-center outline-none text-3xl"
              placeholder="0"
            />
          </div>
        </div>
        {/* Button */}
        <div onClick={() => router.push("/forgot-password")}>
          <AuthButton title="Verify Code" />
        </div>
        {/* Text */}
        <div className="flex justify-start items-center space-x-1">
          <p className="text-gray-600">Didn’t receive the OTP? </p>

          <p className="font-semibold text-[#6DE8A6] cursor-pointer select-none">
            Resend
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
