import { Worker } from "bullmq";
import mongoose from "mongoose";
import { processor } from "./job/queueProcessor";
import { config } from "dotenv";

config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Worker service is connected to the database");

    const redisHost = process.env.REDIS_HOST;
    const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

    console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);

    const worker = new Worker("queue-message", processor, {
      connection: {
        host: redisHost,
        port: redisPort,
      },
      concurrency: 5,
    });

    worker.on("failed", (job, err) => {
      console.error(`JOB: ${job?.id} failed: ${err.message}`);
    });

    console.log("Worker is now listening to queue messages");
  } catch (err: any) {
    console.error("Startup error:", err.message);
  }
};

start();
