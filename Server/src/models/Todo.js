import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

export const Todo = mongoose.model("Todo", todoSchema);