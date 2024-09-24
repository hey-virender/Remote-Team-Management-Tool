import mongoose from "mongoose";

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.log("Error connecting to MongoDB:", e);
  }
};

export default dbConnection;
