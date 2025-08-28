import mongoose from "mongoose";

export const connectDB = async () => {
    // mongoose.set("debug", true); // Add this line for verbose logging
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // exit with failure
    }
};


