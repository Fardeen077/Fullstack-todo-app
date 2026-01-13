import { create } from "zustand"
import toast from "react-hot-toast"
import {
    logoutApi,
    registerApi,
    loginApi,
    fetchedUser
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
            toast.success("Account created successfully");
            return response.data;
        } catch (error) {
            set({ isLoading: false })
            toast.error(error?.response?.data?.message || error.message || "Register failed");
            throw error;
        }
    },

    login: async (userData) => {
        set({ isLoading: true, authUser: null, isAuth: false });
        try {
            const response = await loginApi(userData);
            set({ authUser: response.data.user, isAuth: true, isLoading: false });
            toast.success("User login successfully");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Login failed");
            set({ isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, isAuth: false, authUser: null });
        try {
            await logoutApi();
            toast.success("User logout successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout falid");
            throw error;
        } finally {
            set({ isLoading: false });
            window.location.replace("/login");
        }
    },

    getUser: async () => {
        set({ isLoading: true });
        try {
            const response = await fetchedUser();
            set({ authUser: response.data, isAuth: true, isLoading: false });
            return response;
        } catch (error) {
            set({ isLoading: false, isAuth: false, authUser: null });
        }
    }
}));

export default useAuthStore;