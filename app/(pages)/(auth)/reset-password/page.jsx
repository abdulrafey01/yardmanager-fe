"use client";
import Input from "../../../components/auth/common/Input";
import React, { useState } from "react";

import PwdIcon from "../../../assets/auth/2-AdornmentEnd.svg";
import AuthButton from "../../../components/auth/common/AuthButton";
import AuthToast from "../../../abstracts/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { setShowToast } from "../../../../lib/features/shared/sharedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const page = () => {
  const [pwdVal, setPwdVal] = useState("");
  const [pwdCVal, setPwdCVal] = useState("");
  const [loaderState, setLoaderState] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  // Function to handle reset password
  const changePwd = async () => {
    setLoaderState(true);

    if (pwdVal.length < 8) {
      setLoaderState(false);
      return dispatch(
        setShowToast({
          value: true,
          msg: "Password must be at least 8 characters",
          red: true,
        })
      );
    }
    if (pwdVal !== pwdCVal) {
      setLoaderState(false);
      return dispatch(
        setShowToast({
          value: true,
          msg: "Password and Confirm Password do not match",
          red: true,
        })
      );
    }
    try {
      const response = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/change-password",

        {
          password: pwdVal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoaderState(false);
      console.log("Verification response:", response.data);
      dispatch(
        setShowToast({
          value: true,
          msg: response.data.message,
        })
      );
    } catch (error) {
      console.error("Error Resetting password:", error);
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
  const router = useRouter();
  return (
    <div className="flex-1 flex justify-center items-center">
      <AuthToast show={true} />
      {/* Main container */}
      <div className="w-72 sm:w-96 space-y-8">
        {/* Text Container */}
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-2xl sm:text-3xl">Reset your password</p>
          <p className="text-sm text-[#9CA3AF]">
            Your new password must be different from the old password
          </p>
        </div>
        {/* Input Container */}
        <form action={changePwd} className="flex flex-col space-y-4">
          <Input
            value={pwdVal}
            onChange={(e) => setPwdVal(e.target.value)}
            placeholder="New Password"
            icon={PwdIcon}
          />
          <Input
            value={pwdCVal}
            onChange={(e) => setPwdCVal(e.target.value)}
            placeholder="Retype Password"
            icon={PwdIcon}
          />
          {/* Button */}
          <div>
            <AuthButton title="Reset Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
