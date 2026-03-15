import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/index.js";
import path from "path"
const app = express();

const __dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Client/dist", "index.html"));
    })
}
app.get("/debug-cookie", (req, res) => {
    console.log(req.cookies);
    res.json(req.cookies);
});

export { app };