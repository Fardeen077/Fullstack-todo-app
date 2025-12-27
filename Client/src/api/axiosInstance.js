import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.vite.SERVER_URL,
    withCredentials:true,
});