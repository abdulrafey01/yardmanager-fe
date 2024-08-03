import React from "react";
import GreenToggle from "../../../../components/common/GreenToggle";

const page = () => {
  return (
    <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-4 w-screen md:w-full ">
      {/* First container */}

      <>
        <div
          className={`w-full bg-white  items-center justify-start  p-4 rounded-lg flex `}
        >
          <GreenToggle />
          <div className="flex flex-col justify-between">
            <p className="font-bold">Inventory Price</p>
            <p className="text-[#6E7793]">
              Require Price when adding inventory
            </p>
          </div>
        </div>

        {/* Second container */}
        <div
          className={`w-full bg-white  items-center justify-start  p-4 rounded-lg flex `}
        >
          <GreenToggle />
          <div className="flex flex-col justify-between">
            <p className="font-bold">Part Images</p>
            <p className="text-[#6E7793]">
              Require Part images when adding inventory
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default page;
