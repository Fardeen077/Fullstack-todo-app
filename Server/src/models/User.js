import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    avatar: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
