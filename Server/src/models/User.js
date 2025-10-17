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

userSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.method.ispasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.method.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    }, process.env.ACCESS_TOKEN_SECRET, 
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
});
};

userSchema.method.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
};

export const User = mongoose.model("User", userSchema);
