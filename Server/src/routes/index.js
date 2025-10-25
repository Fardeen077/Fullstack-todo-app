import authRouter from "./auth.routes.js";
import todoRouter from "./todo.routes.js";
import { Router } from "express";

const router = Router();

router.use("/", authRouter);
router.use("/todo", todoRouter)

export default router;