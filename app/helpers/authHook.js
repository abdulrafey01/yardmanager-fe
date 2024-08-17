import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie, getLocalStorage } from "./storage";
import {
  adminLogout,
  logout,
  setUser,
} from "../../lib/features/auth/authSlice";
import axios from "axios";
import { usePathname } from "next/navigation";
import { cleanStorage } from "./cleanStorage";

const useLoadAuthState = () => {
  const dispatch = useDispatch();
  const pathName = usePathname();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (pathName.includes("admin")) {
        try {
          const response = await axios.get(
            "https://yardmanager-be.vercel.app/api/admin/info",
            {
              headers: {
                Authorization: `Bearer ${
                  getCookie("adminToken") ||
                  window?.sessionStorage.getItem("adminToken")
                }`,
              },
            }
          );
          dispatch(setUser({ data: response.data.data, userType: "admin" })); // as admin
        } catch (error) {
          // Any error in fetching info ,logout
          cleanStorage();
          setTimeout(() => {
            dispatch(adminLogout());
          }, 3000);
          console.log("Error fetching Admin info:", error);
        }
      } else {
        try {
          const response = await axios.get(
            "https://yardmanager-be.vercel.app/api/users/info",
            {
              headers: {
                Authorization: `Bearer ${
                  getCookie("token") || window?.sessionStorage.getItem("token")
                }`,
              },
            }
          );
          console.log("User info:", response.data);
          dispatch(
            setUser({
              company: response.data.data.company,
              data: response.data.data.user,
              userType: response.data.data.type,
            })
          );
        } catch (error) {
          // Any error in fetching info ,logout
          cleanStorage();
          setTimeout(() => {
            dispatch(logout());
          }, 3000);
          console.log("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [dispatch]);
};

export default useLoadAuthState;
