import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://fullstack-todo-app-8.onrender.com/api/v1/user",
    withCredentials: true,
});