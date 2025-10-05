import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const server = express();

server.use(cors({
    origin: process.env.CORE_ORIGIN,
    Credentials: true,
}));

server.use(express.json({ limit: "2kb" }));

server.use(express.urlencoded({ extended: true, limit: "2kb" }));
server.use(express.static("public"));
server.use(cookieParser());

export { server };