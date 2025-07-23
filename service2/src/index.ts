import { Worker } from "bullmq";
import mongoose from "mongoose";
import { processor } from "./job/queueProcessor";
import { config } from "dotenv";

config();

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("worker service is connent to database");

  const worker = new Worker("queue-message", processor, {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as any,
    },
    concurrency: 5,
  });

  worker.on("failed", (data, err) => {
    console.log(`JOB: ${data?.id} failed: ${err}`);
  });

  console.log(" working is now listening to queue messages");
};

start();
