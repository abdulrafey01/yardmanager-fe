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
  fetchAllFunc,
  setIdFunc,
  setColorToggle = null, // for setting color only in case of part
  typeInventory = false,
  typeDate = false,
  setVariantData = null,
}) => {
  const [showDropDown, setShowDropDown] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate an array of years from 1950 to the current year
  const yearsArray = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  // Example of using the yearsArray
  console.log(yearsArray); // ["1950", "1951", ..., "2024"]
  const [filteredDates, setFilteredDates] = React.useState([]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
    if (typeDate) {
      setFilteredDates(
        yearsArray.filter((year) => year.includes(e.target.value))
      );
    } else if (e.target.value.length >= 1) {
      setShowDropDown(true);
      dispatch(
        onSearch({
          val: e.target.value,
          isAdmin: user?.userType === "admin",
          totalOverview: false,
        })
      );
    } else {
      dispatch(
        fetchAllFunc({
          isAdmin: user?.userType === "admin",
          totalOverview: false,
        })
      );
    }
  };

  const onNameClick = (item) => {
    if (typeInventory) {
      setIdFunc(item);
    } else if (typeDate) {
      return setInputValue(item);
    } else {
      setIdFunc(item._id);
      if (setVariantData) {
        setVariantData(item.variant);
      }
    }
    if (setColorToggle) {
      setColorToggle(item.color);
    }
    setShowDropDown(false);
    setInputValue(item[keyToShow]);
  };

  return (
    <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
      {typeDate ? (
        <input
          onFocus={() => {
            setFilteredDates(yearsArray);
            setShowDropDown(true);
          }}
          className="w-full outline-none"
          type="number"
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
          autoComplete="off"
          onBlur={() =>
            setTimeout(() => {
              setShowDropDown(false);
            }, 200)
          }
        />
      ) : (
        <input
          onFocus={() => {
            setShowDropDown(true);
            dispatch(
              fetchAllFunc({
                isAdmin: user?.userType === "admin",
                totalOverview: false,
              })
            );
          }}
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
      )}
      <Image src={DownArrow} alt="downarrow" />
      {/* Dropdown */}
      <div
        className={`${
          showDropDown ? "block" : "hidden"
        } bg-white overflow-auto z-50  absolute top-[110%] w-full left-0  rounded-lg border shadow-md p-3 flex flex-col justify-start max-h-40`}
      >
        {typeDate ? (
          <>
            {filteredDates.map((item) => {
              return (
                <p
                  onClick={() => onNameClick(item)}
                  className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                >
                  {item}
                </p>
              );
            })}
            {filteredDates.length == 0 && <p className="p-2"> No results</p>}
          </>
        ) : (
          <>
            {searchData.length == 0 && <p className="p-2"> No results</p>}
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
          </>
        )}
      </div>
    </div>
  );
};

export default DropDownInput;
