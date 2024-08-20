import React, { useEffect, useRef } from "react";

import CrossIcon from "../../assets/main/64-cross.svg";

import Image from "next/image";

const MultiInput = ({
  onPressEnter,
  dataToMap,
  removeItemFunction,
  placeholder,
  name,
}) => {
  const variantList = [
    "Front",
    "Rear",
    "Front Right",
    "Front Left",
    "Rear Right",
    "Rear Left",
    "Upper Front Right",
    "Upper Front Left",
    "Upper Rear Right",
    "Upper Rear Left",
    "Lower Front Right",
    "Lower Front Left",
    "Lower Rear Right",
    "Lower Rear Left",
  ]; // just for variant input

  const [filteredVariantList, setFilteredVariantList] =
    React.useState(variantList);
  const [variantMenu, setVariantMenu] = React.useState(false);
  const [variantInputVal, setVariantInputVal] = React.useState("");

  const menuRef = useRef(null);

  useEffect(() => {
    if (variantMenu && menuRef.current) {
      menuRef.current.scrollTop = 0; // Scroll to the top whenever the menu is opened
      setVariantInputVal("");
      setFilteredVariantList(variantList);
    }
  }, [variantMenu]);

  const onVariantInputChange = (e) => {
    setVariantInputVal(e.target.value);
    setFilteredVariantList(
      variantList.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPressEnter(e.target[0].value);
          e.target[0].value = "";
        }}
        onBlur={() => {
          setTimeout(() => {
            setVariantMenu(false);
            setVariantInputVal("");
          }, 200);
        }}
        tabIndex={0}
        className="w-full outline-none relative"
      >
        {name === "variant" ? (
          <>
            <input
              className="w-full outline-none"
              type="text"
              placeholder={placeholder}
              name={name}
              value={variantInputVal}
              onClick={() => setVariantMenu(!variantMenu)}
              onChange={onVariantInputChange}
            />
            <div
              ref={menuRef}
              className={`${
                variantMenu ? "block" : "hidden"
              } bg-white overflow-auto absolute top-[160%] w-full left-0  rounded-lg border  shadow-md   flex flex-col justify-start max-h-40 pt-1 z-40`}
            >
              {filteredVariantList.length === 0 ? (
                <p className="p-2 px-4 border-b-[1px]  cursor-pointer text-gray-500  font-medium">
                  No Options
                </p>
              ) : (
                filteredVariantList.map((variant) => {
                  return (
                    <p
                      onClick={() => {
                        onPressEnter(variant);
                        setVariantMenu(!variantMenu);
                      }}
                      className="p-2 px-4 border-b-[1px]  cursor-pointer hover:bg-gray-100 font-medium"
                    >
                      {variant}
                    </p>
                  );
                })
              )}
            </div>
          </>
        ) : (
          <input
            className="w-full outline-none"
            type="text"
            placeholder={placeholder}
            name={name}
          />
        )}
      </form>
    </div>
  );
};

export default MultiInput;
