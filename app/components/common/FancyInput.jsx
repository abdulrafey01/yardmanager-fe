import React from "react";

const FancyInput = ({ placeholder, identity }) => {
  return (
    <div className="bg-white flex-1 rounded-lg ">
      <div className="relative bg-inherit ">
        <input
          type="text"
          id={identity}
          name={identity}
          className="peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-1 px-2 ring-gray-300 focus:ring-[#78FFB6] focus:outline-none focus:border-rose-600"
          placeholder={placeholder}
        />
        <label
          for={identity}
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#78FFB6] peer-focus:text-sm transition-all"
        >
          {placeholder}{" "}
        </label>
      </div>
    </div>
  );
};

export default FancyInput;
