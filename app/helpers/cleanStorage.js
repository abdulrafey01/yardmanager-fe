import { removeCookie } from "./storage";
export const cleanStorage = () => {
  localStorage.clear();
  removeCookie("token");
};
