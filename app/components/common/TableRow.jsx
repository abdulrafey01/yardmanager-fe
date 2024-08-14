import React from "react";

import DotsIcon from "../../assets/main/31-icon.svg";
import Image from "next/image";
import ActionMenu from "../common/ActionMenu";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../invoices/Badge";
import "../../styles.css";
import { setShowActionMenu } from "../../../lib/features/shared/sharedSlice";

const TableRow = ({
  titles,
  rowIndex,
  item,
  permissions,
  fetchYards = null,
}) => {
  const { currentPage, showActionMenu } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  const renderPartRow = (titles) => {
    // If index is 1 which means it has variant array then map the variant array differently
    return titles.map((title, index) =>
      index === 1 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  flex-wrap break-all  gap-2 p-3 flex-[2]  items-center flex ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[1].map((variant, index) => (
            <div
              key={index}
              className={`bg-[#1212121A] rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {variant}
            </div>
          ))}
        </div>
      ) : (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16 p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };

  const renderInvoiceRow = (titles) => {
    return titles.map((title, index) =>
      index === 6 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-20   p-3  flex-1 flex items-center`}
        >
          <Badge received={title} />
        </div>
      ) : (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  text-center  p-3 flex-1 flex items-center`}
        >
          {title}
        </div>
      )
    );
  };

  const renderDeletedItemsRow = (titles) => {
    return titles.map((title, index) =>
      index === 0 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  text-center  p-3  flex items-center`}
        >
          {title}
        </div>
      ) : index === 3 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22 p-3 flex-1 flex-wrap break-all  gap-2   flex   items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[3].map((model, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {model}
            </div>
          ))}
        </div>
      ) : index === 4 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  flex-wrap break-all  gap-2  p-3 flex-1  flex  items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[4].map((make, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {make}
            </div>
          ))}
        </div>
      ) : index === 5 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  flex-wrap break-all  gap-2  p-3 flex-1  flex  items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {titles[5].map((variant, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {variant}
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16 p-3 flex-1 flex  text-center items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };
  const renderVehicleRow = (titles) => {
    return titles.map((title, index) =>
      index === 0 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  text-center  p-3  flex items-center`}
        >
          {title}
        </div>
      ) : // if index is 3 show it like this and if index is 4 show it like that
      index === 3 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  text-center p-3 flex-1 flex-wrap break-all  gap-2   justify-start items-center flex ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[3].map((model, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {model}
            </div>
          ))}
        </div>
      ) : index === 4 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  text-center p-3 flex-1 flex-wrap break-all  gap-2   justify-start items-center flex ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[4].map((make, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {make}
            </div>
          ))}
        </div>
      ) : index === 5 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  text-center p-3 flex-1 flex-wrap break-all  gap-2   justify-start items-center flex ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[5].length === 0 ? (
            <div
              className={`bg-[#12121209]   rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              No Variant
            </div>
          ) : (
            titles[5].map((variant, index) => (
              <div
                key={index}
                className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
              >
                {variant}
              </div>
            ))
          )}
        </div>
      ) : index === 6 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  text-center p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Notes"
              className="w-full outline-none bg-transparent cursor-default "
              value={titles[6]}
              readOnly
            />
          </div>
        </div>
      ) : index === 7 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  text-center p-3 flex items-center flex-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none bg-transparent cursor-default "
              value={titles[7]}
              readOnly
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  text-center p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };
  const renderInventoryRow = (titles) => {
    return titles.map((title, index) =>
      index === 0 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  text-center  p-3  flex items-center`}
        >
          {title}
        </div>
      ) : // if index is 3 show it like this and if index is 4 show it like that
      index === 3 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  text-center p-3 flex-1 flex-wrap break-all  gap-2   justify-start items-center flex ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[3].map((model, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {model}
            </div>
          ))}
        </div>
      ) : index === 4 || index === 5 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-22  text-center p-3 flex-1 flex-wrap break-all  gap-2   justify-start items-center flex ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb]"
          }`}
        >
          {titles[index].map((make, index) => (
            <div
              key={index}
              className={`bg-[#1212121A]  rounded-full min-w-20 p-3 h-4 flex justify-center items-center text-xs `}
            >
              {make}
            </div>
          ))}
        </div>
      ) : index === 6 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  text-center p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Notes"
              className="w-full outline-none bg-transparent"
              value={titles[6]}
            />
          </div>
        </div>
      ) : index === 7 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  text-center p-3 flex items-center flex-1 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none bg-transparent"
              value={titles[7]}
              readOnly
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` min-w-16  text-center p-3 flex-1 flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          {title}
        </div>
      )
    );
  };

  const renderEmployeeRow = (titles) => {
    return titles.map((title, index) =>
      index === 0 ? (
        <div
          key={index}
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  text-center  p-3  flex items-center`}
        >
          {title}
        </div>
      ) : index === 6 ? (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  p-3  text-center flex-1 flex items-center`}
        >
          <Badge active={title} />
        </div>
      ) : (
        <div
          onClick={() => dispatch(setShowActionMenu(-1))}
          className={` ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          } min-w-16  text-center  p-3 flex-1 flex items-center`}
        >
          {title}
        </div>
      )
    );
  };

  const renderLocationRow = (titles) => {
    return titles.map((title, index) => (
      <div
        key={index}
        onClick={() => dispatch(setShowActionMenu(-1))}
        className={` ${
          rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] flex  items-center"
        } min-w-16  p-3  flex-1`}
      >
        {title}
      </div>
    ));
  };
  return (
    <div className="w-full flex flex-col ">
      {/* Row */}
      {/* For even rows bg-white */}
      <div
        className={`w-full border border-[#EDEEF2] ${
          rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
        } text-sm flex justify-between break-all`}
      >
        {currentPage === "Parts"
          ? renderPartRow(titles)
          : currentPage === "Invoices"
          ? renderInvoiceRow(titles)
          : currentPage === "Dashboard"
          ? renderInvoiceRow(titles)
          : currentPage === "DeletedItems"
          ? renderDeletedItemsRow(titles)
          : currentPage === "Vehicle"
          ? renderVehicleRow(titles)
          : currentPage === "Employee"
          ? renderEmployeeRow(titles)
          : currentPage === "Locations"
          ? renderLocationRow(titles)
          : currentPage === "Inventory"
          ? renderInventoryRow(titles)
          : titles.map((title, index) =>
              index === 0 ? (
                <div
                  key={index}
                  onClick={() => dispatch(setShowActionMenu(-1))}
                  className={` ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
                  } min-w-16  text-center  p-3  flex items-center`}
                >
                  {title}
                </div>
              ) : (
                <div
                  onClick={() => dispatch(setShowActionMenu(-1))}
                  className={` ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
                  } min-w-16  p-3 flex  items-center  flex-1`}
                >
                  {title}
                </div>
              )
            )}

        <div
          className={` min-w-16 p-3 pl-8 relative text-center flex items-center ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-[#fbfbfb] "
          }`}
        >
          <Image
            onClick={() => {
              if (currentPage === "DeletedItems") {
                if (
                  permissions?.write === false &&
                  permissions?.delete === false
                ) {
                  return;
                }
              }
              // if clicked on same row icon, close the Menu else close all and open respective row icon
              if (showActionMenu === rowIndex) {
                dispatch(setShowActionMenu(-1));
              } else {
                dispatch(setShowActionMenu(-1));
                dispatch(setShowActionMenu(rowIndex));
              }
            }}
            tabIndex={0}
            onBlur={() => {
              setTimeout(() => {
                dispatch(setShowActionMenu(-1));
              }, 300);
            }}
            src={DotsIcon}
            alt="MenuIcon"
            className="cursor-pointer "
          ></Image>
          <ActionMenu
            permissions={permissions}
            index={rowIndex}
            item={item}
            fetchYards={fetchYards}
          />
        </div>
      </div>
    </div>
  );
};

export default TableRow;
