import React from "react";
import Loader from "../../../abstracts/Loader";
import { useSelector } from "react-redux";
const AuthButton = ({ title, onClick, loaderState }) => {
  const { btnLoader } = useSelector((state) => state.auth); // for redux toolkit. Loader state is for apis that are not in redux toolkit
  return btnLoader || loaderState ? (
    <div className="flex justify-center items-center w-72 sm:w-96 h-12 rounded-md cursor-pointer">
      <Loader />
    </div>
  ) : (
    <button
      type="submit"
      onClick={onClick}
      className="flex justify-center items-center bg-[#78FFB6] hover:bg-[#3ffb97] w-72 sm:w-96 h-12 rounded-md cursor-pointer"
    >
      <p className=" font-bold">{title}</p>
    </button>
  );
};

export default AuthButton;
