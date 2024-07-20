import React from "react";

import Image from "next/image";

const MainInput = ({
  placeholder,
  icon,
  type,
  name,
  onChange,
  value,
  onIconClick,
  className,
  typeAble = true,
  onBlur,
  onClick,
}) => {
  return (
    <div
      className={`flex-1 h-12  bg-white rounded-xl flex justify-center items-center pr-2 border-[#D0D5DD] border-[1px] overflow-hidden hover:border-gray-400 ${className}`}
    >
      <input
        className={`w-full h-12 p-3 rounded-md outline-none  ${
          !typeAble && "caret-transparent"
        }`}
        placeholder={placeholder}
        name={name}
        onClick={onClick}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        autoComplete="off"
        // If there exist a type then use that otherwise use text
        type={type ? type : "text"}
        onBlur={onBlur}
      />

      {icon && <Image src={icon} alt="msgicon" onClick={onIconClick} />}
    </div>
  );
};

export default MainInput;
