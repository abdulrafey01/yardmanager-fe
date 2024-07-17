"use client";
import React, { useState } from "react";
import Input from "../../../components/auth/common/Input";
import AuthButton from "../../../components/auth/common/AuthButton";
import MsgIcon from "../../../assets/auth/1-AdornmentEnd.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "https://yardmanager-be.vercel.app/api/users/forgot-password",
        { email }
      );
      console.log("Password reset email sent:", response.data);
      router.push(`/code-verify?email=${email}`);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
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
        <Input
          placeholder="Email "
          icon={MsgIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Button */}
        <div onClick={handleForgotPassword}>
          <AuthButton title="Send Code" />
        </div>
      </div>
    </div>
  );
};

export default Page;
