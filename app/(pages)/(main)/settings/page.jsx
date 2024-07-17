"use client";
import React, { useEffect } from "react";
import GreenToggle from "../../../components/common/GreenToggle";
import { setCurrentPage } from "../../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import { setColorToggle } from "../../../../lib/features/settings/settingsSlice";
import { getLocalStorage, setLocalStorage } from "../../../helpers/storage";

const page = () => {
  const dispatch = useDispatch();
  const { colorToggle } = useSelector((state) => state.settings);

  const { user } = useSelector((state) => state.auth);
  const [pagePermission, setPagePermission] = React.useState(null);
  const [priceToggle, setPriceToggle] = React.useState(false);
  const [partImageToggle, setPartImageToggle] = React.useState(false);

  useEffect(() => {
    if (JSON.parse(getLocalStorage("priceToggle"))) {
      setPriceToggle(JSON.parse(getLocalStorage("priceToggle")));
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(getLocalStorage("partImageToggle"))) {
      setPartImageToggle(JSON.parse(getLocalStorage("partImageToggle")));
    }
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage("Settings"));
  }, [dispatch]);

  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "user") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
      setPagePermission(
        user.data.role.privileges.find(
          (privilege) => privilege.name === "settings"
        )?.permissions
      );
    }
    // console.log(user);
  }, [user]);
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-4 w-screen md:w-full ">
        {/* First container */}
        {pagePermission?.update && (
          <div className="w-full bg-white flex items-center justify-start  p-4 rounded-lg">
            <GreenToggle
              onChange={(e) => {
                setPriceToggle(e.target.checked);
                setLocalStorage("priceToggle", e.target.checked);
              }}
              checked={priceToggle}
            />
            <div className="flex flex-col justify-between">
              <p className="font-bold">Inventory Price</p>
              <p className="text-[#6E7793]">
                Require Price when adding inventory
              </p>
            </div>
          </div>
        )}

        {/* Second container */}
        <div className="w-full bg-white flex  items-center justify-start  p-4 rounded-lg">
          <GreenToggle
            onChange={(e) => {
              setPartImageToggle(e.target.checked);
              setLocalStorage("partImageToggle", e.target.checked);
            }}
            checked={partImageToggle}
          />
          <div className="flex flex-col justify-between">
            <p className="font-bold">Part Images</p>
            <p className="text-[#6E7793]">
              Require Part images when adding inventory
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default page;
