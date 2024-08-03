import React from "react";

import CrossIcon from "../../assets/main/64-cross.svg";

import Image from "next/image";

const MultiInput = ({
  onPressEnter,
  dataToMap,
  removeItemFunction,
  placeholder,
  name,
}) => {
  return (
    <div className="w-full flex flex-wrap gap-2 gap-y-4 p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
      {dataToMap?.map((item, index) => (
        <div
          key={index}
          className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center gap-2 text-sm `}
        >
          {item}
          <Image
            onClick={() => removeItemFunction(index)}
            className="cursor-pointer"
            src={CrossIcon}
            alt="cross"
          />
        </div>
      ))}
      <input
        className="w-full outline-none"
        type="text"
        placeholder={placeholder}
        name={name}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.keyCode === 13 || e.which === 13) {
            onPressEnter(e);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default MultiInput;
