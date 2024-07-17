import { removeCookie } from "./storage";
export const cleanStorage = async () => {
  await localStorage.clear();
  await removeCookie("token");
};
