import React from "react";
import Loader from "../../../abstracts/Loader";
import { useSelector } from "react-redux";
const AuthButton = ({ title, onClick }) => {
  const { btnLoader } = useSelector((state) => state.auth);
  return btnLoader ? (
    <div className="flex justify-center items-center w-72 sm:w-96 h-12 rounded-md cursor-pointer">
      <Loader />
    </div>
  ) : (
    <div
      onClick={onClick}
      className="flex justify-center items-center bg-[#78FFB6] hover:bg-[#3ffb97] w-72 sm:w-96 h-12 rounded-md cursor-pointer"
    >
      <p className=" font-bold">{title}</p>
    </div>
  );
};

export default AuthButton;
