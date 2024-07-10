"use client";
import React, { useEffect } from "react";
import GreenToggle from "../../../components/common/GreenToggle";
import { setCurrentPage } from "../../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import { setColorToggle } from "../../../../lib/features/settings/settingsSlice";

const page = () => {
  const dispatch = useDispatch();
  const { colorToggle } = useSelector((state) => state.settings);

  const { user } = useSelector((state) => state.auth);
  const [pagePermission, setPagePermission] = React.useState(null);

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
    pagePermission?.read ? (
      <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-4 w-screen md:w-full ">
        {/* First container */}
        {pagePermission?.update && (
          <div className="w-full bg-white flex items-center justify-start  p-4 rounded-lg">
            <GreenToggle
              onChange={(e) => {
                dispatch(setColorToggle(e.target.checked));
              }}
              checked={colorToggle}
            />
            <div className="flex flex-col justify-between">
              <p className="font-bold">Inventory Color</p>
              <p className="text-[#6E7793]">
                Require color when adding inventory
              </p>
            </div>
          </div>
        )}

        {/* Second container */}
        <div className="w-full bg-white hidden items-center justify-start  p-4 rounded-lg">
          <GreenToggle />
          <div className="flex flex-col justify-between">
            <p className="font-bold">Part Images</p>
            <p className="text-[#6E7793]">
              Require Part images when adding inventory
            </p>
          </div>
        </div>
      </div>
    ) : (
      <p>You don't have permission to access this page</p>
    )
  );
};

export default page;
