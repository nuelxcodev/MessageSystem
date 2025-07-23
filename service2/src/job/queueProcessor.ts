import { Job } from "bullmq";
import { Message } from "../models/MessageSchema";

export const processor = async (job: Job) => {
  const { id } = job.data;
  const message = await Message.findById({ id });
  if (message) {
    console.log(`Sending message to ${message.email}: ${message.message}`);
  } else {
    throw new Error("no message is found");
  }
};
