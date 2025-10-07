import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MOngoDB is connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB is not Connect", error);
        process.exit(1);
    }
}

export default connectDB;