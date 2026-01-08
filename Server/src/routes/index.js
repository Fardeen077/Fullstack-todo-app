import todoRouter from "../routes/todo.routes.js"
import authRouter from "../routes/auth.routes.js"
import { Router } from "express";

const router = Router();

router.use("/", authRouter);
router.use("/", todoRouter)

export default router;