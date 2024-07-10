"use client";
import React, { useMemo, useState } from "react";
import AuthButton from "../../../components/auth/common/AuthButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const searchParams = useSearchParams();
  const codeEmail = useMemo(() => searchParams.get("email"), [searchParams]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  // Function to handle OTP verification
  const verifyCode = async () => {
    console.log(otp.join(""));
    try {
      const response = await axios.post("https://yardmanager-be.vercel.app/api/users/verify-otp", {
        email: codeEmail,
        otp: otp.join("")
      });
      console.log("Verification response:", response.data);
      router.push("/reset-password");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      {/* Main container */}
      <div className="w-72 sm:w-96 space-y-8">
        {/* Text Container */}
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-xl sm:text-3xl">Enter Code Received</p>
          <p className="text-sm text-[#9CA3AF]">
            Enter the code sent to your email or mobile number.
          </p>
        </div>
        <div className="flex justify-between items-center">
          {otp.map((digit, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-white border-[#D0D5DD] border-2 rounded-lg"
            >
              <input
                type="number"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-full h-full text-center outline-none text-3xl"
                placeholder="0"
              />
            </div>
          ))}
        </div>
        {/* Button */}
        <div onClick={verifyCode}>
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

export default Page;
