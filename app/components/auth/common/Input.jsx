import React from "react";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Input = ({
  placeholder,
  icon,
  onChange,
  name,
  type,
  value,
  iconClick,
}) => {
  return (
    <div className="w-72 sm:w-96 h-12  bg-white rounded-xl flex justify-center items-center pr-2 border-[#D0D5DD] border-[1px] overflow-hidden hover:border-gray-400">
      <input
        onChange={onChange}
        name={name}
        className="w-full h-12 p-3 rounded-md  outline-none "
        placeholder={placeholder}
        type={type ? type : "text"}
        value={value}
      />
      {icon && (
        <Image
          className="cursor-pointer"
          src={icon}
          alt="msgicon "
          onClick={iconClick}
        />
      )}
    </div>
  );
};

export default Input;
