import { error } from "console";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { Message } from "../models/MessageSchema";
import { queue } from "../libs/queue";

const messageRoute = Router();

messageRoute.post("/message", body("email").isEmail(), body("message").notEmpty(), async (req: Request, res: Response) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json({ error: err.array() });
  const { email, message } = req.body;
  const new_message = await Message.create({
    email,
    message,
  });
  await queue.add("send-message", { id: new_message._id.toString() });
  res.status(200).json({ id: new_message._id });
});

messageRoute.get("/message", async (req: Request, res: Response) => {
  const mslist = await Message.find();
  res.status(200).json({ data: mslist });
});

export default messageRoute;
