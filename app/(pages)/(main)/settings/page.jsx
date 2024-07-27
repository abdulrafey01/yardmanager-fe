"use client";
import React, { useEffect } from "react";
import GreenToggle from "../../../components/common/GreenToggle";
import { setCurrentPage } from "../../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import { setColorToggle } from "../../../../lib/features/settings/settingsSlice";
import {
  getCookie,
  getLocalStorage,
  setLocalStorage,
} from "../../../helpers/storage";
import { permission } from "process";
import axios from "axios";
import useLoadAuthState from "../../../helpers/authHook";

const page = () => {
  useLoadAuthState();
  const dispatch = useDispatch();
  const { colorToggle } = useSelector((state) => state.settings);

  const { user } = useSelector((state) => state.auth);
  const [pagePermission, setPagePermission] = React.useState(null);
  const [priceToggle, setPriceToggle] = React.useState(false);
  const [partImageToggle, setPartImageToggle] = React.useState(false);

  useEffect(() => {
    setPartImageToggle(user?.company.image);
    setPriceToggle(user?.company.price);
  }, [user]);

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

  const handleTogglePrice = async (e) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    axios
      .put(
        "https://yardmanager-be.vercel.app/api/users/company",
        { price: e.target.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setPriceToggle(res.data.data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleImg = async (e) => {
    const token = getCookie("token") || window?.sessionStorage.getItem("token");
    axios
      .put(
        "https://yardmanager-be.vercel.app/api/users/company",
        { image: e.target.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setPartImageToggle(res.data.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-4 w-screen md:w-full ">
        {/* First container */}

        <>
          <div
            className={`w-full bg-white  items-center justify-start  p-4 rounded-lg ${
              pagePermission?.update
                ? "flex"
                : "flex opacity-50 pointer-events-none"
            } `}
          >
            <GreenToggle onChange={handleTogglePrice} checked={priceToggle} />
            <div className="flex flex-col justify-between">
              <p className="font-bold">Inventory Price</p>
              <p className="text-[#6E7793]">
                Require Price when adding inventory
              </p>
            </div>
          </div>

          {/* Second container */}
          <div
            className={`w-full bg-white  items-center justify-start  p-4 rounded-lg ${
              pagePermission?.update
                ? "flex"
                : "flex opacity-50 pointer-events-none"
            } `}
          >
            <GreenToggle onChange={handleToggleImg} checked={partImageToggle} />
            <div className="flex flex-col justify-between">
              <p className="font-bold">Part Images</p>
              <p className="text-[#6E7793]">
                Require Part images when adding inventory
              </p>
            </div>
          </div>
        </>
      </div>
    )
  );
};

export default page;
