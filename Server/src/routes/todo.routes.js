import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo,
} from "../controllers/TodoController.js"

const router = Router();

router.route("/")
    .get(verifyJWT, getTodo)
    .post(verifyJWT, createTodo)

router.route("/:id")
    .put(verifyJWT, updateTodo)    // Update todo
    .delete(verifyJWT, deleteTodo); // Delete todo

export default router