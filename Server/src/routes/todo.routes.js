import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo,
} from "../controllers/TodoController.js"

const router = Router();

router.route("/todo")
    .get(getTodo)
    .post(createTodo)

router.route("/todo/:id")
    .put(updateTodo)    // Update todo
    .delete(deleteTodo); // Delete todo

export default router