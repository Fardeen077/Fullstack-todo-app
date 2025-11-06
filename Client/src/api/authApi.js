import { axiosInstance } from "./axiosInstance";

export const register = async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axiosInstance.post("/login", userData);
    return response.data
};

export const logout = async () => {
    const response = await axiosInstance.post("/logout");
    return response.data
};



