import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/Todo.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ADD NEW TODO
const createTodo = asyncHandler(async (req, res,) => {
    const { title } = req.body;
    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    const newTodo = await Todo.create({ title, userId: req.user._id });

    const response = new ApiResponse(200, newTodo, "Todo Add is successfully");
    return res.status(response.statusCode).json(response);
});


// All TODO
const getTodo = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ userId: req.user._id });

    const response = new ApiResponse(200, todos, "Todos fetched successfully");
    return res.status(response.statusCode).json(response)
});


// DELETE TODO
const deleteTodo = asyncHandler(async (req, res,) => {
    const { id } = req.params; // receive id from frontend

    const todo = await Todo.findById(id);
    if (!todo) {
        throw new ApiError(400, "Todo not found");
    }
    const deletedTodo = await Todo.findByIdAndDelete(id);

    const response = new ApiResponse(200, deletedTodo, "Todo Delete successfully");
    return res.status(response.statusCode).json(response);

});

// update Todo
const updateTodo = asyncHandler(async (req, res,) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
        throw new ApiError(400, "todo not found");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id,
        { title: req.body.title, completed: req.body.completed },
        { new: true }
    );

    const response = new ApiResponse(200, updatedTodo, "Todo is updated successfully");
    return res.status(response.statusCode).json(response);

});

// flip todo status
const updateTodoStatus = asyncHandler(async (req, res,) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
        throw new ApiError(400, "todo not found");
    };
    todo.status = !todo.status
    await todo.save();

    const response = new ApiResponse(200, todo, "Todo status update successfully");
    return res.status(response.statusCode).json(response)
});

export {
    updateTodoStatus,
    createTodo,
    updateTodo,
    getTodo,
    deleteTodo
}