import { axiosInstance } from "./axiosInstance";

export const allTodosApi = async () => {
    const response = await axiosInstance.get("/todo");
    return response.data;
};

export const createTodoApi = async (todoData) => {
    const response = await axiosInstance.post("/todo", todoData);
    return response.data;
};

export const deleteTodoApi = async (id) => {
    const response = await axiosInstance.delete(`/todo/${id}`);
    return response.data;
};

export const updateTodoApi = async (id, updatedTodo) => {
    const response = await axiosInstance.put(`/todo/${id}`, updatedTodo);
    return response.data;
};

export const updateStatusApi = async (id)=> {
    const response = await axiosInstance.patch(`/todo/${id}`);
    return response.data
}