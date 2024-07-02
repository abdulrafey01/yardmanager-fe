import React from "react";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const MainInput = ({ placeholder, icon, type }) => {
  return (
    <div className="flex-1 h-12  bg-white rounded-xl flex justify-center items-center pr-2 border-[#D0D5DD] border-[1px] overflow-hidden hover:border-gray-400">
      <input
        className="w-full h-12 p-3 rounded-md outline-none "
        placeholder={placeholder}
        // If there exist a type then use that otherwise use text
        type={type ? type : "text"}
      />

      {icon && <Image src={icon} alt="msgicon" />}
    </div>
  );
};

export default MainInput;
