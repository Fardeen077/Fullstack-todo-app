import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // 1. Token from cookies OR Authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  // 2. No token → unauthorized
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  // 3. Verify token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // 4. Find user
  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  // 5. Attach user to request
  req.user = user;
  next();
});
