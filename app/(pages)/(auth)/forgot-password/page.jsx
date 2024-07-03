"use client";
import Input from "../../../components/auth/common/Input";
import MsgIcon from "../../../assets/auth/1-AdornmentEnd.svg";
import React from "react";
import AuthButton from "../../../components/auth/common/AuthButton";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col  justify-center items-center">
      <div className="flex flex-col space-y-6 w-72 sm:w-96">
        {/* Text */}
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-2xl sm:text-3xl">
            Let's get you signed in.
          </p>
          <p className="text-sm text-[#9CA3AF]">
            Enter your email or mobile number associated with podium account and
            we’ll send you a temporary access code!
          </p>
        </div>
        {/* Input */}
        <Input placeholder="Email or Mobile Number" icon={MsgIcon} />
        {/* Button */}
        <div
          onClick={() => {
            router.push("/code-verify");
          }}
        >
          <AuthButton title="Send Code" />
        </div>
      </div>
    </div>
  );
};

export default page;
