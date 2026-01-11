import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo,
    updateTodoStatus
} from "../controllers/TodoController.js"

const router = Router();

router.route("/todo")
    .get(verifyJWT, getTodo)
    .post(verifyJWT, createTodo)

router.route("/todo/:id")
    .patch(verifyJWT, updateTodoStatus)
    .put(verifyJWT, updateTodo)    // Update todo
    .delete(verifyJWT, deleteTodo); // Delete todo

export default router