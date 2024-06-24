import React from "react";

const AuthButton = ({ title }) => {
  return (
    <div className="flex justify-center items-center bg-[#78FFB6] hover:bg-[#3ffb97] w-72 sm:w-96 h-12 rounded-md cursor-pointer">
      <p className=" font-bold">{title}</p>
    </div>
  );
};

export default AuthButton;
