import React from "react";

type Props = {
  title: string;
};

const AuthButton = ({ title }: Props) => {
  return (
    <div className="flex justify-center items-center bg-[#78FFB6] w-96 h-12 rounded-md cursor-pointer">
      <p className=" font-bold">{title}</p>
    </div>
  );
};

export default AuthButton;
