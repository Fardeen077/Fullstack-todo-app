import mongoose from "mongoose";
// import { User } from "./User";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stateus: {
        type: Boolean,
        default: false, // todo states like completed or not compeleted
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

export const Todo = mongoose.model("Todo", todoSchema);