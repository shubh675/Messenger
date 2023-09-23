import express from "express"
import { createSingleChat } from "../controllers/chat/createSingleChat.js";
import { getAllChat } from "../controllers/chat/getAllChat.js";
import { getAllMessage } from "../controllers/message/getAllMessages.js";
import { sendMessage } from "../controllers/message/sendMessage.js";


export const chatRouter = express.Router();
chatRouter.get("/",getAllChat);
chatRouter.route("/:chatId").post(sendMessage).get(getAllMessage);
chatRouter.post("/create/singleChat",createSingleChat);
