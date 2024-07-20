"use client";
import React, { useEffect } from "react";
import SideBar from "../../components/common/SideBar";

import AbsoluteMenusAndModals from "../../components/common/AbsoluteMenusAndModals";
import TopBar from "../../components/common/TopBar";
import "../../styles.css";
import Toast from "../../abstracts/Toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useloadAuthState from "../../helpers/authHook";
import NavRow from "../../components/admin/common/NavRow";

const layout = ({ children }) => {
  useloadAuthState();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Set up the timeout
    const timeoutId = setTimeout(() => {
      if (!token) {
        router.push("/sign-in");
      }
    }, 2000);

    // Clean up the timeout if `token` changes or component unmounts
    return () => clearTimeout(timeoutId);
  }, [token]);
  // useloadAuthState();
  // const router = useRouter();
  // const { token } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!getCookie("token") && !window?.sessionStorage.getItem("token")) {
  //     router.push("/sign-in");
  //   }
  // }, [token]);

  return (
    <div className="flex relative w-full select-none  min-h-screen">
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
