import React from "react";

import BasketIcon from "../../assets/main/54-basket.svg";
import Image from "next/image";
const ProductDetailRow = ({
  name,
  quantity,
  price,
  date,
  total,
  onRemoveProductClick,
  index,
}) => {
  return (
    <div className="w-full hidden lg:flex justify-between border-gray-300 border-b">
      <div className=" min-w-16 p-4 flex-[2] rounded-t-xl flex items-center">
        <p className=" min-w-16 p-2 flex-1 flex items-center justify-center">
          {name}
        </p>
      </div>
      <div className=" min-w-16 p-4 flex-1 flex items-center">
        <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
          {quantity}
        </p>
      </div>
      <div className=" min-w-16 p-4 flex-1 flex items-center">
        <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
          {price}
        </p>
      </div>
      <div className=" min-w-16 p-4 flex-1 flex items-center">
        <p className=" min-w-16 p-2 flex-1  flex items-center justify-start font-bold">
          {date}
        </p>
      </div>
      <p className=" min-w-16 p-2 flex-1 font-bold flex items-center justify-center">
        {total}
      </p>
      <div
        onClick={() => {
          onRemoveProductClick(index);
        }}
        className=" min-w-16 p-4 flex-1 rounded-t-xl flex items-center justify-center cursor-pointer"
      >
        <Image src={BasketIcon} alt="delete" />
      </div>
    </div>
  );
};

export default ProductDetailRow;
