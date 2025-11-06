import { axiosInstance } from "./axiosInstance";

export const allTodos = async() => {
    const response = await axiosInstance.get("/todo");
    return response.data;
};

export const createTodo = async(todoData) => {
    const response = await axiosInstance.post("/todo", todoData);
    return response.data;
};

export const deleteTodo = async(id) => {
    const response = await axiosInstance.delete(`/todo/${id}`);
    return response.data;
};

export const updateTodo = async(id, updateTodoData) => {
    const response = await axiosInstance.put(`/todo/${id}`, updateTodoData);
    return response.data;
};