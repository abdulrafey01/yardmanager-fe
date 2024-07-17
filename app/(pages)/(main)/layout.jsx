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
import useloadAuthState from "../../helpers/authHook";
import NavRow from "../../components/admin/common/NavRow";

const layout = ({ children }) => {
  useloadAuthState();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const isToken = getCookie("token");
    console.log("istoken", isToken);
    console.log("token", token);
    if (!isToken || isToken === "undefined" || isToken === "null") {
      router.push("/sign-in");
    }
  }, [token]);

  return (
    <div className="flex relative w-full  min-h-screen">
      <Toast />
      <AbsoluteMenusAndModals />
      <SideBar />
      <div className="flex-[5] flex w-full  flex-col">
        <TopBar />
        {/* <NavRow /> */}
        {children}
      </div>
    </div>
  );
};

export default layout;
