import { create } from "zustand"
import toast from "react-hot-toast"
import {
    logout,
    register,
    login
} from "../api/authApi";

const useAuthStore = create((set) => ({
    authUser: null,
    isLoading: false,
    isAuth: false,

    register: async (userData) => {
        set({ isLoading: true });
        try {
            const response = await register(userData);
            set({ authUser: response.data, isAuth: true });
            toast.success("Account Created");
        } catch (error) {
            toast.error(error.message?.data?.message || "Register faild");
            set({ isLoading: false })
        }
    },

    login: async (userData) => {
        set({ isLoading: true });
        try {
            const response = await login(userData);
            set({ authUser: response.user.data, isAuth: true });
            toast.success("User login");
        } catch (error) {
            toast.error(error?.message?.data?.message || "Login faild");
        }
    },

    logout: async () => {
        try {
            await logout();
            set({ authUser: null, isAuth: false });
            toast.success("User Logout")
        } catch (error) {
            toast.error(error.message?.data?.message || "Logout falid");
        }
    },
}));
export default useAuthStore;