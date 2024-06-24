import React from "react";

const TableHeadRow = ({ titles }) => {
  return (
    <thead className="bg-[#f2fff8] border border-[#EDEEF2] text-sm">
      <tr>
        {titles.map((title, index) => (
          <th key={index} className="p-3 text-left">
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadRow;
