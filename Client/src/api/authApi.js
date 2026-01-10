import { axiosInstance } from "./axiosInstance";

export const registerApi = async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
};

export const loginApi = async (userData) => {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
};

export const logoutApi = async () => {
    const response = await axiosInstance.post("/logout");
    return response.data
};

export const fetchedUser = async()=> {
    const response = await axiosInstance.get("/me");
    return response.data;
}

