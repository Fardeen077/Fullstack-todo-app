import { create } from "zustand";
import toast from "react-hot-toast";
import {
    allTodos,
    createTodo,
    deleteTodo,
    updateTodo
} from "../api/todoApi"

const useTodoStore = create((set) => ({
    todos: [],
    isLoading: false,

    addTodo: async (todoData) => {
        set({ isLoading: true });
        try {
            const response = await createTodo(todoData);
            set((state) => ({
                todos: [response, ...state.todos], isLoading: false
            }));
            set({ isLoading: false });
            toast.success("Todo added successfully");
        } catch (error) {
            set({ isLoading: false });
            toast("failed add todo");
        }
    },

    deleteTodo: async (id) => {
        set({ isLoading: true });
        try {
            await deleteTodo(id);
            set((state) => ({
                todos: state.todos.filter((item) => item.id !== id)
            }));
            set({ isLoading: false });
            toast.success("todo delete");
        } catch (error) {
            set({ isLoading: false });
            toast.error("failed delete todo")
        }
    },

    updateTodo: async (id, updatedTodo) => {
        set({ isLoading: true });
        try {
            const response = await updateTodo(id, updatedTodo);
            set((state) => ({
                todos: state.todos.map((item) => (item.id === id ? response : item))
            }));
            set({ isLoading: false });
            toast.success("update todo");
        } catch (error) {
            set({ isLoading: false });
            toast.error("failed update todo")
        }
    },

    allTodos: async () => {
        set({ isLoading: true });
        try {
            const response = await allTodos();
            set({ isLoading: false, todos: response })
        } catch (error) {
            set({ isLoading: false });
            toast.error("intrnal server error");
        }
    }
}));

export default useTodoStore;