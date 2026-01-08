import { create } from "zustand"
import toast from "react-hot-toast"
import {
    logoutApi,
    registerApi,
    loginApi
} from "../api/authApi";

const useAuthStore = create((set) => ({
    authUser: null,
    isLoading: false,
    isAuth: false,

    register: async (userData) => {
        set({ isLoading: true });
        try {
            const response = await registerApi(userData);
            // response is the ApiResponse object from server; response.data contains { user, accessToken, refreshToken }
            set({ authUser: response.data.user, isAuth: true, isLoading: false });
            toast.success("Account Created");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Register failed");
            set({ isLoading: false })
            throw error;
        }
    },

    login: async (userData) => {
        set({ isLoading: true });
        try {
            const response = await loginApi(userData);
            set({ authUser: response.data.user, isAuth: true, isLoading: false });
            toast.success("User login");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Login failed");
            set({ isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        try {
            await logoutApi();
            set({ authUser: null, isAuth: false });
            toast.success("User Logout")
        } catch (error) {
            toast.error(error.message?.data?.message || "Logout falid");
        }
    },
}));
export default useAuthStore;