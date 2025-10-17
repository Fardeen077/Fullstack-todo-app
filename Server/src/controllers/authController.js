import { ApiError } from "../utils/ApiError";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(400, "Error generating token")
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if ([email, username, password].some((filed) => filed?.trim() === "")) {
        throw new ApiError(400, "All fields cannot be empty");
    }
    const existsUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existsUser) {
        throw new ApiError(400, "User is already exists");
    };

    const user = await User.create({
        username: username.toLowerCase(),
        email:email.toLowerCase(),
        password,
    });

    const tokens = await generateAccessTokenAndRefreshToken(user._id);
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Error creating user !!!");
    }
    return res.status(201).json(new ApiResponse(201, "User created", {user: createdUser, ...tokens}));
});
export {
    generateAccessTokenAndRefreshToken,
    registerUser,
};