import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie, getLocalStorage } from "./storage";
import { setUser } from "../../lib/features/auth/authSlice";
import axios from "axios";

const useLoadAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
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
        console.log("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
};

export default useLoadAuthState;
