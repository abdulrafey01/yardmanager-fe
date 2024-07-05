import axios from "axios";
const api = (url, token) => {
  return axios.create({
    baseURL: "https://yardmanager-be.vercel.app/api/" + url,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;

// WIll do later
