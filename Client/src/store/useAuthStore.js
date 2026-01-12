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
    isAuth: true,

    register: async (userData) => {
        set({ isLoading: true });
        try {
            const response = await registerApi(userData);
            // response is the ApiResponse object from server; response.data contains { user, accessToken, refreshToken }
            set({ authUser: response.data.user, isAuth: true, isLoading: false });
            toast.success("Account created successfully");
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
            toast.success("User login successfully");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Login failed");
            set({ isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await logoutApi();
            set({ authUser: null, isAuth: false });
            toast.success("User logout successfully")
            return response;
        } catch (error) {
         error(error.response?.data?.message || "Logout falid");
        }
    },

    getUser: async () => {
        set({ isLoading: true });
        try {
            const response = await fetchedUser();
            set({ authUser: response, isAuth: true, isLoading: false });
            return response
        } catch (error) {
            set({ isLoading: false, isAuth: false, authUser: null })
            error(error.response?.data?.message || "somethink wrong with you")
        }
    }
}));
export default useAuthStore;