// import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/Todo.js";
import { ApiError } from "../utils/ApiError.js";

// ADD NEW TODO
const createTodo = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title) {
            throw new ApiError(400, "Title is required");
        }
        const newTodo = await Todo.create({ title, userId: req.user._id });

        const response = new ApiResponse(201, newTodo, "Todo Add is successfully");
        return res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
};

// All TODO

const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        // return res.status(200).json(new ApiResponse(200, todos, "All todo"))
        const response = new ApiResponse(201, todos, "Todos fetched successfully");
        return res.status(response.statusCode).json(response)
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(500, null, error.message || "faild to fetched all todos"))
    }
};

// DELETE TODO

const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params; // receive id from frontend

        const todo = await Todo.findById(id);
        if (!todo) {
            throw new ApiError(400, "Todo not found");
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        const response = new ApiResponse(201, deletedTodo, "Todo Delete successfully");
        return res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
};

// update Todo

const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);
        if (!todo) {
            throw new ApiError(400, "todo not found");
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id,
            { title: req.body.title, completed: req.body.completed },
            { new: true }
        );
        const response = new ApiResponse(201, updatedTodo, "Todo is updated successfully");
        return res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}
export {
    createTodo,
    updateTodo,
    getTodo,
    deleteTodo
}