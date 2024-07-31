import axios from "axios";
import { getCookie } from "../../app/helpers/storage";

const isBrowser = typeof window !== "undefined";

let token;
if (isBrowser) {
  token =
    getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
