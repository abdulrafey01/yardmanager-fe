"use client";
import React, { useEffect } from "react";
import SideBar from "../../components/common/SideBar";

import AbsoluteMenusAndModals from "../../components/common/AbsoluteMenusAndModals";
import TopBar from "../../components/common/TopBar";
import "../../styles.css";
import Toast from "../../abstracts/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getCookie } from "../../helpers/storage";

const layout = ({ children }) => {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push("/sign-in");
    }
  }, [token]);

  return (
    <div className="flex relative  min-h-screen">
      <Toast />
      <AbsoluteMenusAndModals />
      <SideBar />
      <div className="flex-[5] flex flex-col">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
