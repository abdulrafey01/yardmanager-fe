"use client";
import React, { useEffect } from "react";
import SectionOne from "../../components/auth/common/SectionOne";
import Toast from "../../abstracts/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../helpers/storage";
import { useRouter } from "next/navigation";
import { setShowToast } from "../../../lib/features/shared/sharedSlice";
import { resetToast, setToken } from "../../../lib/features/auth/authSlice";

const layout = ({ children }) => {
  const { token, error, toastMsg } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = React.useState(false);
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
  // For Routing auth
  useEffect(() => {
    if (token) {
      // console.log("token", token);
      setToken(getCookie("token"));
      router.push("/dashboard");
    }
  }, [token]);
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <Toast />
      <SectionOne />
      {children}
    </div>
  );
};

export default layout;
