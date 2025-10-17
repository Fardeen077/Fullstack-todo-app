import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

// ✅ Middleware to verify JWT token (used for protected routes)
export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // 🔹 1. Get token from cookies OR from Authorization header
        // If frontend sends token in cookies → req.cookies.accessToken
        // If frontend sends token in header (Bearer <token>) → extract from there
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
        console.log(token); // (Just to check what token we received)

        // 🔹 2. If token not found, stop request and send Unauthorized error
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // 🔹 3. Verify the token using secret key
        // This checks if the token is valid or expired
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 🔹 4. Find user by ID (decoded from token) but don’t include password or refreshToken
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // 🔹 5. If user doesn’t exist (maybe deleted or invalid token)
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // 🔹 6. Attach user info to request object so next middleware/controller can use it
        req.user = user;

        // 🔹 7. Continue to next function (like profile or todo route)
        next();

    } catch (error) {
        // 🔹 8. If anything fails (token missing, invalid, expired)
        // Send a clean error message to client
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
