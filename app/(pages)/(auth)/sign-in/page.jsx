import React from "react";
import PwdIcon from "../../../assets/auth/2-AdornmentEnd.svg";

import MsgIcon from "../../../assets/auth/1-AdornmentEnd.svg";
import GoogleIcon from "../../../assets/auth/3-Socialicon.svg";
import FbIcon from "../../../assets/auth/4-logos_facebook.svg";
import Image from "next/image";
import Input from "../../../components/auth/common/Input";
import AuthButton from "../../../components/auth/common/AuthButton";

export default function page() {
  return (
    <div className="flex-1 flex flex-col  justify-center items-center">
      {/* Main container in Middle */}
      <div className="flex flex-col justify-center items-center sm:items-start   space-y-4 w-96 overflow-visible p-4">
        <div className="flex flex-col justify-center items-center sm:items-start">
          <p className="font-bold text-3xl">Sign In</p>
          <p className="text-sm">Sign in to your account</p>
        </div>
        {/* Input container */}
        <div className="flex flex-col space-y-4">
          <Input placeholder="Active Email Address" icon={MsgIcon} />
          <Input placeholder="Password" icon={PwdIcon} />
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="bg-white flex justify-center items-center rounded-sm border-white">
                <input type="checkbox" className="h-3.5 w-3.5 outline-none" />
              </div>
              <p>Remember Me</p>
            </div>
            <div>
              <p className="font-semibold">Forgot Password?</p>
            </div>
          </div>
        </div>
        {/* Button */}
        <AuthButton title="Sign In" />
        {/* "or continuue" line */}
        <div className="flex justify-center items-center w-full">
          <div className="h-px flex-1 bg-[#78FFB6]"></div>
          <p className="flex-2 p-4 text-gray-600">Or Continue With?</p>
          <div className="h-px flex-1 bg-[#78FFB6]"></div>
        </div>

        {/* Social Account buttons container*/}
        <div className="flex w-full justify-center items-center space-x-2 sm:space-x-4">
          <div className="h-11 bg-white flex flex-1 justify-center items-center space-x-2 rounded-lg border-[1px] border-[#D0D5DD]">
            <Image src={GoogleIcon} alt="logo" />
            <p className="text-xs font-semibold">Sign in with Google</p>
          </div>
          <div className="h-11 bg-white flex flex-1 justify-center items-center space-x-2 rounded-lg border-[1px] border-[#D0D5DD]">
            <Image src={FbIcon} alt="logo" />
            <p className="text-xs font-semibold">Signup with Facebook</p>
          </div>
        </div>

        {/* Last Line container */}
        <div className="flex justify-center items-center w-full space-x-1">
          <p className="text-gray-600">Don't have an account? </p>
          <p className="font-semibold text-[#78FFB6]"> Create Account!</p>
        </div>
      </div>
    </div>
  );
}
