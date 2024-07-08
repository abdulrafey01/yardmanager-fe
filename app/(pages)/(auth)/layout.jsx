"use client";
import React, { useEffect } from "react";
import SectionOne from "../../components/auth/common/SectionOne";
import Toast from "../../abstracts/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../helpers/storage";
import { useRouter } from "next/navigation";
import { setShowToast } from "../../../lib/features/shared/sharedSlice";

const layout = ({ children }) => {
  const { token, error, toastMsg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  // For Routing auth
  useEffect(() => {
    if (getCookie("token")) {
      // console.log("token", token);
      router.push("/dashboard");
    }
    if (error) {
      console.log("error", error);
    }

    if (toastMsg) {
      dispatch(setShowToast({ value: true, msg: toastMsg }));
    }
  }, [token, error, toastMsg, dispatch]);

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Toast />
      <SectionOne />
      {children}
    </div>
  );
};

export default layout;
