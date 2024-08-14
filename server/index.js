import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("Error while connecting to database", err.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.listen(8000, () => {
  connect();
  console.log("connected to backend");
});
