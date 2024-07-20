import React from "react";

import BasketIcon from "../../assets/main/54-basket.svg";
import BasketIcon2 from "../../assets/main/81-greybasket.svg";
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
    <>
      {/* For large devices */}
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
      {/* For small devices */}
      <div className="w-full lg:hidden flex p-2 ">
        <div className="flex flex-col text-sm w-full p-4 gap-2 bg-gray-100  rounded-lg">
          {/* Container 1 */}
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1 flex-1 ">
              <p className="font-semibold">Product Name</p>
              <p className="text-[gray]">{name}</p>
            </div>
            <Image
              onClick={() => {
                onRemoveProductClick(index);
              }}
              src={BasketIcon2}
              alt="delete"
              height={25}
              width={25}
            />
          </div>
          {/* Container 2 */}
          <div className="flex  items-center w-full gap-1">
            <div className="flex flex-col gap-1 flex-1 justify-center items-center">
              <p className="font-semibold">Unit Price</p>
              <p className="text-[gray]">{price}</p>
            </div>
            <div className="w-[1px] h-8 bg-[gray]" />
            <div className="flex flex-col gap-1 flex-1 justify-center items-center">
              <p className="font-semibold">Quantity</p>
              <p className="text-[gray]">{quantity}</p>
            </div>
            <div className="w-[1px] h-8 bg-[gray]" />
            <div className="flex flex-col gap-1 flex-1 justify-center items-center">
              <p className="font-semibold">Date</p>
              <p className="text-[gray]">{date}</p>
            </div>
            <div className="w-[1px] h-8 bg-[gray]" />
            <div className="flex flex-col gap-1 flex-1 justify-center items-center ">
              <p className="font-semibold">Total</p>
              <p className="text-[gray]">{total}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailRow;
