import axiosInstance from "./axiosInstance";

// Add yard
export const addYard = async (data) => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  } catch (error) {
    console.log("Error adding yard:", error);
    throw error;
  }
};

// Get Yards By Page
export const getYardsByPage = async (body) => {
  let params;
  if (body.search) {
    params = `search=${body.search}`;
  } else if (body.page && body.limit) {
    params = `page=${body.page}&limit=${body.limit}`;
  }

  try {
    const response = await axiosInstance.get(`/company/paginate?${params}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching yards:", error);
    throw error;
  }
};
