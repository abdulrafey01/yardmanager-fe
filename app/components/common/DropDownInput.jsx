import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DownArrow from "../../assets/main/28-downarrow.svg";
import Image from "next/image";
const DropDownInput = ({
  onSearch,
  searchData,
  keyToShow,
  placeholder,
  inputValue,
  setInputValue,
  setIdFunc,
  setColorToggle = null, // for setting color only in case of part
}) => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length >= 1) {
      setShowDropDown(true);
      dispatch(
        onSearch({
          val: e.target.value,
          isAdmin: user?.userType === "admin",
          totalOverview: false,
        })
      );
    } else {
      setShowDropDown(false);
    }
  };

  const onNameClick = (item) => {
    setInputValue(item[keyToShow]);
    setIdFunc(item._id);
    if (setColorToggle) {
      setColorToggle(item.color);
    }
    setShowDropDown(false);
  };
  return (
    <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
      <input
        onClick={() => setShowDropDown(true)}
        className="w-full outline-none"
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={onInputChange}
        autoComplete="off"
        onBlur={() =>
          setTimeout(() => {
            setShowDropDown(false);
          }, 300)
        }
      />
      <Image src={DownArrow} alt="downarrow" />
      {/* Dropdown */}
      <div
        className={`${
          showDropDown ? "block" : "hidden"
        } bg-white overflow-auto no-scrollbar absolute top-[110%] w-full left-0  rounded-lg border border-black p-3 flex flex-col justify-start max-h-40`}
      >
        {searchData.length == 0 && (
          <p className="p-2">Enter character to search</p>
        )}
        {searchData.map((item) => {
          return (
            <p
              onClick={() => onNameClick(item)}
              className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
            >
              {item[keyToShow]}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DropDownInput;
