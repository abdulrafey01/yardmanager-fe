"use client";
import React, { useEffect } from "react";
import GreenToggle from "../../../../components/common/GreenToggle";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../../../lib/features/shared/sharedSlice";
import { getCookie } from "../../../../helpers/storage";
import axios from "axios";
import useLoadAuthState from "../../../../helpers/authHook";

const page = () => {
  useLoadAuthState();
  const [approvalToggle, setApprovalToggle] = React.useState(false);
  const [backupToggle, setBackupToggle] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage("Settings"));
  }, [dispatch]);

  useEffect(() => {
    setApprovalToggle(user?.data.approval);
    setBackupToggle(user?.data?.backup);
  }, [user]);

  const handleToggleApproval = async (e) => {
    const token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
    axios
      .put(
        "https://yardmanager-be.vercel.app/api/admin/update",
        { approval: e.target.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setApprovalToggle(res.data.data?.approval);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleBackup = async (e) => {
    const token =
      getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
    axios
      .put(
        "https://yardmanager-be.vercel.app/api/admin/update",
        { backup: e.target.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setBackupToggle(res.data.data?.backup);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-4 w-screen md:w-full ">
      <>
        <h2 className="font-bold text-2xl">General Settings</h2>
        {/* <div
          className={`w-full bg-white  items-center justify-start  p-4 rounded-lg flex `}
        >
          <GreenToggle
            checked={approvalToggle}
            onChange={handleToggleApproval}
          />
          <div className="flex flex-col justify-between">
            <p className="font-bold">Auto-Approve User Registrations</p>
            <p className="text-[#6E7793]">
              Automatically approve new user registrations upon submission.
            </p>
          </div>
        </div> */}

        {/* Second TOggle */}
        {/* <div
          className={`w-full bg-white  items-center justify-start  p-4 rounded-lg flex `}
        >
          <GreenToggle />
          <div className="flex flex-col justify-between">
            <p className="font-bold">User Role Editing</p>
            <p className="text-[#6E7793]">
              Allow super admins to edit user roles.
            </p>
          </div>
        </div> */}
        {/* Third Toggle */}
        <div
          className={`w-full bg-white  items-center justify-start  p-4 rounded-lg flex `}
        >
          <GreenToggle checked={backupToggle} onChange={handleToggleBackup} />
          <div className="flex flex-col justify-between">
            <p className="font-bold">Backup Schedule</p>
            <p className="text-[#6E7793]">
              Enable automatic backup of system data on a scheduled basis.
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default page;
