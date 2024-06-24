import React from "react";
import SectionOne from "../../components/auth/common/SectionOne";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <SectionOne />
      {children}
    </div>
  );
};

export default layout;
