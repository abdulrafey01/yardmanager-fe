import React from "react";
import SideBar from "../../components/common/SideBar";

type Props = {};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex bg-red-500 min-h-screen">
      <SideBar />
      <div className="flex-[5]">{children}</div>
    </div>
  );
};

export default layout;
