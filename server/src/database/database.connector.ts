import mongoose from "mongoose";

export async function connectDB() {
  const connString = process.env.MONGODB_URI || "";

  if (!connString) {
    console.error("MongoDB connection string is invalid");
    return;
  }

  const options = {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  };

  try {
    await mongoose.connect(connString, options);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error connecting to the database:", err.message);
    } else {
      console.error("Unknown error during database connection:", err);
    }
  }
  const dbConnection = mongoose.connection;

  dbConnection.on("error", (err) => {
    console.error("Database connection error:", err);
  });
}
