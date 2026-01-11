import { create } from "zustand";
import toast from "react-hot-toast";
import {
    allTodosApi,
    createTodoApi,
    deleteTodoApi,
    updateTodoApi,
    updateStatusApi
} from "../api/todoApi"

const useTodoStore = create((set) => ({
    todos: [],
    isLoading: false,

    addTodo: async (todoData) => {
        set({ isLoading: true });
        try {
            const response = await createTodoApi(todoData);
            set((state) => ({
                todos: [response.data, ...state.todos], isLoading: false
            }));
            toast.success("Todo added successfully");
        } catch (error) {
            set({ isLoading: false });
            toast.error("failed add todo");
        }
    },

    deleteTodo: async (id) => {
        set({ isLoading: true });
        try {
            await deleteTodoApi(id);
            set((state) => ({
                todos: state.todos.filter((item) => item._id !== id)
            }));
            set({ isLoading: false });
            toast.success("Todo delect successfully");
        } catch (error) {
            set({ isLoading: false });
            toast.error("failed delete todo")
        }
    },

    updateTodo: async (id, updatedTodo) => {
        set({ isLoading: true });
        try {
            const response = await updateTodoApi(id, updatedTodo);
            set((state) => ({
                todos: state.todos.map((item) => (item._id === id ? response.data : item))
            }));
            set({ isLoading: false });
            toast.success("Todo updated successfully");
        } catch (error) {
            set({ isLoading: false });
            toast.error("failed update todo")
        }
    },

    fetchTodos: async () => {
        set({ isLoading: true });
        try {
            const response = await allTodosApi();
            set({ isLoading: false, todos: response.data })
        } catch (error) {
            set({ isLoading: false });
            toast.error("intrnal server error");
        }
    },

    updateStatus: async (id) => {
        set({ isLoading: true });
        try {
            const response = await updateStatusApi(id);
            set((state) => ({
                todos: state.todos.map((item) => (item._id === id ? response.data : item))
            }));
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw new Error("update stateus error", error);
        }
    },
}));

export default useTodoStore;