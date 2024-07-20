"use client";
import React, { useEffect } from "react";
import SectionOne from "../../components/auth/common/SectionOne";
import Toast from "../../abstracts/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setShowToast } from "../../../lib/features/shared/sharedSlice";
import { resetToast } from "../../../lib/features/auth/authSlice";

const layout = ({ children }) => {
  const { token, error, toastMsg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (toastMsg) {
      dispatch(setShowToast({ value: true, ...toastMsg }));
    }
    dispatch(resetToast());
  }, [toastMsg]);

  // For Routing auth
  useEffect(() => {
    if (token) {
      // console.log("token", token);
      router.push("/dashboard");
    }
  }, [token]);

  // For Routing auth
  // useEffect(() => {
  //   if (window?.sessionStorage.getItem("token")) {
  //     // console.log("token", token);
  //     router.push("/dashboard");
  //   }
  // }, [token]);
  return (
    <div className="min-h-screen select-none flex justify-center items-center ">
      <Toast />
      <SectionOne />
      {children}
    </div>
  );
};

export default layout;
