import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Database connection failed", err);
      process.exit();
    });
  } catch (error) {
    console.log("Connection to db failed", error);
  }
}
