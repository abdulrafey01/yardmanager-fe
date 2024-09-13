import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, getLocalStorage } from "./storage";
import {
  adminLogout,
  logout,
  setUser,
} from "../../lib/features/auth/authSlice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { cleanStorage } from "./cleanStorage";

const defaultPrivileges = [
  {
    name: "employees",
    permissions: { read: true, write: false, delete: false, update: false },
  },
  {
    name: "invoices",
    permissions: { read: true, write: true, delete: false, update: false },
  },
  {
    name: "inventory",
    permissions: { read: true, write: true, delete: true, update: false },
  },
  {
    name: "locations",
    permissions: { read: false, write: false, delete: false, update: false },
  },
  {
    name: "recycled",
    permissions: { read: false, write: false, delete: false, update: false },
  },
  {
    name: "settings",
    permissions: { read: false, write: false, delete: false, update: false },
  },
  {
    name: "parts",
    permissions: { read: false, write: false, delete: false, update: false },
  },
  {
    name: "roles",
    permissions: { read: false, write: false, delete: false, update: false },
  },
  {
    name: "vehicles",
    permissions: { read: false, write: false, delete: false, update: false },
  },
];
const useLoadAuthState = () => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { user } = useSelector((state) => state.auth);
  const ref = useRef(false);
  const router = useRouter();

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
          dispatch(setUser({ data: response.data?.data, userType: "admin" })); // as admin
        } catch (error) {
          // Any error in fetching info ,logout
          cleanStorage();
          setTimeout(() => {
            dispatch(adminLogout());
          }, 3000);
          // console.log("Error fetching Admin info:", error);
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
          if (response?.data?.data?.user === null) {
            // If yard is deleted and user was logged in
            cleanStorage();
            setTimeout(() => {
              dispatch(logout());
            }, 3000);
            return;
          }
          // console.log("User info:", response.data);
          if (response.data?.data?.company?.active === false) {
            cleanStorage();
            setTimeout(() => {
              dispatch(logout());
            }, 3000);
          }
          dispatch(
            setUser({
              company: response.data?.data?.company,
              data: response.data?.data?.user,
              userType: response.data?.data?.type,
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

  useEffect(() => {
    if (user) {
      if (ref.current) return;
      ref.current = true;
      const getSubscription = async () => {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BASE_URL + "/subscription/subscription",
            {
              headers: {
                Authorization: `Bearer ${
                  getCookie("token") || window?.sessionStorage.getItem("token")
                }`,
              },
            }
          );
          if (response.data?.data[0]?.status === "active") {
            dispatch(setUser({ ...user, subscription: response.data.data[0] }));
          } else {
            dispatch(setUser({ ...user, subscription: null }));
            router.push("/subscription");
          }
        } catch (error) {
          console.log("Error fetching subscription info:", error);
          dispatch(setUser({ ...user, subscription: null }));
          router.push("/subscription");
        }
      };

      if (!pathName.includes("admin")) {
        getSubscription();
      }
    }
  }, [user]);
};

export default useLoadAuthState;
