"use client";
import { Provider } from "react-redux";
import { makeStore } from "../../lib/store";

const layout = ({ children }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default layout;
