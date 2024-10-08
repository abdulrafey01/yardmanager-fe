import React, { useEffect, useRef } from "react";

import CrossIcon from "../../assets/main/64-cross.svg";

import Image from "next/image";
import { fetchAllParts } from "../../../lib/features/parts/partActions";
import { useDispatch, useSelector } from "react-redux";

const MultiInput = ({
  onPressEnter,
  dataToMap,
  removeItemFunction,
  placeholder,
  name,
  dataList,
  stopOnChange = false,
  type = null,
}) => {
  const [filteredVariantList, setFilteredVariantList] =
    React.useState(dataList);
  const [variantMenu, setVariantMenu] = React.useState(false);
  const [variantInputVal, setVariantInputVal] = React.useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const timeoutRef = useRef(null);
  const menuRef = useRef(null);
  const partFetchRef = useRef(null);

  useEffect(() => {
    if (variantMenu && menuRef.current) {
      menuRef.current.scrollTop = 0; // Scroll to the top whenever the menu is opened
      setVariantInputVal("");
      setFilteredVariantList(dataList);
    }
  }, [variantMenu]);

  const onVariantInputChange = (e) => {
    setVariantMenu(true);
    setVariantInputVal(e.target.value);
    setFilteredVariantList(
      dataList.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <div className="w-full flex flex-wrap gap-2 gap-y-4 p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD] relative">
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
          if (name === "variant") {
            setVariantInputVal("");
            setVariantMenu(false);
          }
          e.target[0].value = "";
        }}
        onBlur={() => {
          timeoutRef.current = setTimeout(() => {
            setVariantMenu(false);
            setVariantInputVal("");
          }, 200);
        }}
        onFocus={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          // For part input in vehicle page

          setVariantMenu(true);
        }}
        tabIndex={0}
        className="outline-none relative flex flex-1 w-auto min-w-28 items-center bg-slate-400"
      >
        {name === "variant" ? (
          <>
            <input
              className="w-full outline-none flex"
              type="text"
              placeholder={placeholder}
              name={name}
              value={variantInputVal}
              onChange={!stopOnChange ? onVariantInputChange : null}
              onFocus={() => {
                if (type === "part" && !partFetchRef.current) {
                  dispatch(
                    fetchAllParts({
                      isAdmin: user?.userType === "admin",
                      totalOverview: false,
                    })
                  );
                  partFetchRef.current = true;
                }
              }}
            />
            <div
              ref={menuRef}
              className={`${
                variantMenu ? "block" : "hidden"
              } bg-white overflow-auto absolute top-[160%] w-full left-0  rounded-lg border  shadow-md   flex flex-col justify-start max-h-40 pt-1 z-40`}
            >
              {!filteredVariantList || filteredVariantList?.length === 0 ? (
                <p className="p-2 px-4 border-b-[1px]  cursor-pointer text-gray-500  font-medium">
                  No Options
                </p>
              ) : (
                filteredVariantList.map((variant) => {
                  return (
                    <p
                      onClick={() => {
                        onPressEnter(variant);
                        setVariantInputVal("");
                        setVariantMenu(false);
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
