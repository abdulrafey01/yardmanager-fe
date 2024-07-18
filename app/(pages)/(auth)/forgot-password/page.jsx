"use client";
import React, { useState } from "react";
import Input from "../../../components/auth/common/Input";
import AuthButton from "../../../components/auth/common/AuthButton";
import MsgIcon from "../../../assets/auth/1-AdornmentEnd.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setShowToast } from "../../../../lib/features/shared/sharedSlice";

const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loaderState, setLoaderState] = useState(false);
  const dispatch = useDispatch();

  const handleForgotPassword = async () => {
    if (!email) {
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
        { email }
      );
      console.log("Password reset email sent:", response.data);
      router.push(`/code-verify?email=${email}`);
      dispatch(
        setShowToast({
          value: true,
          msg: response.data.message,
        })
      );
      setLoaderState(false);
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
    <div className="flex-1 flex flex-col justify-center items-center">
      <form
        noValidate={false}
        action={() => {
          setLoaderState(true);
          handleForgotPassword();
        }}
        className="flex flex-col space-y-6 w-72 sm:w-96"
      >
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
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Button */}
        <div>
          <AuthButton loaderState={loaderState} title="Send Code" />
        </div>
      </form>
    </div>
  );
};

export default Page;
