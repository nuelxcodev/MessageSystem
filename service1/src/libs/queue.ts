import { Queue } from "bullmq";
import { config } from "dotenv";
config();

export const queue = new Queue("message-queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as any),
  },
});
