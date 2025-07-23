import { Queue } from "bullmq";
import { config } from "dotenv";

config();

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

export const queue = new Queue("message-queue", {
  connection: {
    host: redisHost,
    port: redisPort,
  },
});
