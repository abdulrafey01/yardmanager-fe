import React from "react";

const Footer = ({
  pageNumber,
  setPageNumber,
  totalPage,
  handleRadioClick,
  isSubscriptionOverview = false,
}) => {
  return (
    <div className="p-4 gap-2 w-full rounded-b-lg flex justify-between items-center">
      <p className="font-semibold text-sm">
        {/* dont show totalpage in admin subscripiton page */}
        Page {pageNumber > totalPage ? totalPage : pageNumber}{" "}
        {isSubscriptionOverview ? "" : `of ${totalPage}`}
      </p>
      {/* Rows per page container */}
      <div className="relative flex items-center justify-center gap-2">
        <p className="font-semibold text-sm">Rows per page</p>
        <label
          htmlFor="10"
          className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg "
        >
          <input
            id="10"
            name="radio"
            type="radio"
            value={10}
            defaultChecked
            onChange={handleRadioClick}
          />{" "}
          10
        </label>{" "}
        <label
          htmlFor="25"
          onClick={() => {}}
          className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
        >
          <input
            id="25"
            name="radio"
            type="radio"
            value={25}
            onChange={handleRadioClick}
          />{" "}
          25
        </label>
        <label
          htmlFor="50"
          onClick={() => {}}
          className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
        >
          <input
            id="50"
            name="radio"
            type="radio"
            value={50}
            onChange={handleRadioClick}
          />{" "}
          50
        </label>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div
          onClick={() => setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1)}
          className={`cursor-pointer hover:bg-gray-300 py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg ${
            pageNumber <= 1 && "pointer-events-none opacity-50 "
          } ${pageNumber > totalPage && "pointer-events-none opacity-50"}`}
        >
          Previous
        </div>
        <div
          onClick={() =>
            setPageNumber(
              pageNumber === totalPage ? pageNumber : pageNumber + 1
            )
          }
          className={`cursor-pointer hover:bg-gray-300 py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg ${
            pageNumber >= totalPage && "pointer-events-none opacity-50" //page 1 of 0
          }`}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Footer;
