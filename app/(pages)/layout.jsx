"use client";
import { Provider } from "react-redux";
import { makeStore } from "../../lib/store";
import { useEffect } from "react";
import { getCookie } from "../helpers/storage";
import { useRouter } from "next/navigation";
import Link from "next/link";

const layout = ({ children }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default layout;
