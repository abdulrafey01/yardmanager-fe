import Input from "@/app/components/auth/common/Input";
import SectionOne from "@/app/components/auth/common/SectionOne";
import MsgIcon from "../../../assets/auth/1-AdornmentEnd.svg";
import React from "react";
import AuthButton from "@/app/components/auth/common/AuthButton";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex-1 flex flex-col  justify-center items-center">
      <div className="flex flex-col space-y-6 w-96">
        {/* Text */}
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-3xl">Let's get you signed in.</p>
          <p className="text-sm text-[#9CA3AF]">
            Enter your email or mobile number associated with podium account and
            we’ll send you a temporary access code!
          </p>
        </div>
        {/* Input */}
        <Input placeholder="Email or Mobile Number" icon={MsgIcon} />
        {/* Button */}
        <AuthButton title="Send Code" />
      </div>
    </div>
  );
};

export default page;
