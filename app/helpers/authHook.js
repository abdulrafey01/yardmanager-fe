import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "./storage";
import { setUser } from "../../lib/features/auth/authSlice";

const useLoadAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const token = getCookie("token");
    const user = getLocalStorage("user");

    // if (token) {
    //   dispatch(setToken(token));
    // }

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
};

export default useLoadAuthState;
