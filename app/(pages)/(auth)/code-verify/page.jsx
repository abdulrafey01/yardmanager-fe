"use client";
import React, { Suspense, useMemo, useState } from "react";
import AuthButton from "../../../components/auth/common/AuthButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setShowToast } from "../../../../lib/features/shared/sharedSlice";

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const searchParams = useSearchParams();
  const codeEmail = useMemo(() => searchParams.get("email"), [searchParams]);
  const dispatch = useDispatch();

  const [loaderState, setLoaderState] = useState(false);

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
      const response = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/verify-otp",
        {
          email: codeEmail,
          otp: otp.join(""),
        }
      );
      setLoaderState(false);
      console.log("Verification response:", response.data);
      setTimeout(() => {
        router.push(`/reset-password?token=${response.data.data}`);
      }, 1000);
      dispatch(
        setShowToast({
          value: true,
          msg: response.data.message,
        })
      );
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setLoaderState(false);
      dispatch(
        setShowToast({
          value: true,
          msg: error.response.data.message,
          red: true,
        })
      );
    }
  };

  // Function to resend OTP
  const resendOtp = async () => {
    setLoaderState(true);

    if (!codeEmail) {
      setLoaderState(false);

      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter correct email",
          red: true,
        })
      );
    }
    try {
      const response = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/forgot-password",
        { email: codeEmail }
      );
      setLoaderState(false);
      console.log("Password reset email sent:", response.data);
      router.push(`/code-verify?email=${codeEmail}`);
      dispatch(
        setShowToast({
          value: true,
          msg: response.data.message,
        })
      );
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setLoaderState(false);
      dispatch(
        setShowToast({
          value: true,
          msg: error.response.data.message,
          red: true,
        })
      );
    }
  };
  return (
    <div className="flex-1 flex justify-center items-center">
      {/* Main container */}
      <form
        action={() => {
          setLoaderState(true);
          verifyCode();
        }}
        className="w-72 sm:w-96 space-y-8"
      >
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
        <div>
          <AuthButton loaderState={loaderState} title="Verify Code" />
        </div>
        {/* Text */}
        <div className="flex justify-start items-center space-x-1">
          <p className="text-gray-600">Didn’t receive the OTP? </p>
          <p
            onClick={resendOtp}
            className="font-semibold text-[#6DE8A6] cursor-pointer select-none"
          >
            Resend
          </p>
        </div>
      </form>
    </div>
  );
};

const SuspensePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default SuspensePage;
