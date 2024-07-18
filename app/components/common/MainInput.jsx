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
}) => {
  return (
    <div
      className={`flex-1 h-12  bg-white rounded-xl flex justify-center items-center pr-2 border-[#D0D5DD] border-[1px] overflow-hidden hover:border-gray-400 ${className}`}
    >
      {typeAble ? (
        <>
          <input
            className="w-full h-12 p-3 rounded-md outline-none "
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            autoComplete="off"
            // If there exist a type then use that otherwise use text
            type={type ? type : "text"}
          />

          {icon && <Image src={icon} alt="msgicon" onClick={onIconClick} />}
        </>
      ) : (
        <>
          <div
            className={`w-full h-12 p-3 rounded-md outline-none  ${
              value ? "text-black" : "text-gray-400" // if value then black otherwose gray for placeholder
            }`}
            onClick={(e) => {
              onChange(e);
            }}
            autoComplete="off"
            // If there exist a type then use that otherwise use text
            type={type ? type : "text"}
          >
            {value ? value : placeholder}
          </div>

          {icon && <Image src={icon} alt="msgicon" onClick={onIconClick} />}
        </>
      )}
    </div>
  );
};

export default MainInput;
