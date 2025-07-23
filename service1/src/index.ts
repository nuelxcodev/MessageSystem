import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = 3001;

const app = express();
app.use(express.json());
app.use();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, () => {
  connection();
  console.log(`sever is running on port:${PORT} `);
});
