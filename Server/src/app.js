import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/index.js";
const app = express();

app.use(cors({
    origin:process.env.CORE_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "2md" }));

app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/user", userRouter);

export { app };