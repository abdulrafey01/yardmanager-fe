import React from "react";
import Header from "./Header";
import Image from "next/image";
import LineSvg from "../../assets/auth/6-Line_01.svg";
type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className="flex-1 bg-black flex flex-col justify-start items-center p-6 space-y-6">
      {/* Top part */}
      <div className="flex flex-col space-y-6">
        <Header />
        {/* Line */}
        <Image src={LineSvg} alt="line" />
      </div>
    </div>
  );
};

export default SideBar;
