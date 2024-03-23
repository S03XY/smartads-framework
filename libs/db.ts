import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// dotenv.config({
//   path: "../.evn.sample",
// });

let cachedConnection: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    console.log("db", process.env.MONGO_DB_CONNECTION!);
    const connection = await mongoose.connect(process.env.MONGO_DB_CONNECTION!);
    console.log("MongoDB connected successfully");
    cachedConnection = connection.connection;

    return cachedConnection;
  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    return null;
  }
}

export default mongoose;
