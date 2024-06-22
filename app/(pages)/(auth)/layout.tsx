import SectionOne from "@/app/components/auth/common/SectionOne";
import React from "react";

type Props = {};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <SectionOne />
      {children}
    </div>
  );
};

export default layout;
