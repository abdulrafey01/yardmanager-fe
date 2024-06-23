import React from "react";
import SideBar from "../../components/common/SideBar";
import TopBar from "@/app/components/common/TopBar";

type Props = {};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex bg-[#F9FAFB] min-h-screen">
      <SideBar />
      <div className="flex-[5] flex flex-col">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
