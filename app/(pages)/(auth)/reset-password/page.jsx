import Input from "../../../components/auth/common/Input";
import React from "react";

import PwdIcon from "../../../assets/auth/2-AdornmentEnd.svg";
import AuthButton from "../../../components/auth/common/AuthButton";
import AuthToast from "../../../abstracts/AuthToast";

const page = () => {
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
        <div className="flex flex-col space-y-4">
          <Input placeholder="New Password" icon={PwdIcon} />
          <Input placeholder="Retype Password" icon={PwdIcon} />
        </div>
        {/* Button */}
        <AuthButton title="Reset Password" />
      </div>
    </div>
  );
};

export default page;
