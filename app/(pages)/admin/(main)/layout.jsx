"use client";
import React, { useEffect } from "react";
import SideBar from "../../../components/common/SideBar";

import AbsoluteMenusAndModals from "../../../components/common/AbsoluteMenusAndModals";
import TopBar from "../../../components/common/TopBar";
import "../../../styles.css";
import Toast from "../../../abstracts/Toast";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import useloadAuthState from "../../../helpers/authHook";
import NavRow from "../../../components/admin/common/NavRow";
const layout = ({ children }) => {
  useloadAuthState();
  const router = useRouter();
  const { adminToken } = useSelector((state) => state.auth);
  const pathName = usePathname();

  // Set up the timeout
  // Clean up the timeout if component unmounts
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!adminToken) {
        router.push("/admin/sign-in");
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex relative w-full select-none  min-h-screen">
      <Toast />
      <AbsoluteMenusAndModals />
      <SideBar />
      <div className="flex-[5] flex w-full xl:max-w-[80%]  flex-col">
        <TopBar />
        <NavRow />
        {children}
      </div>
    </div>
  );
};

export default layout;
