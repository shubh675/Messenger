import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

 const User = prisma.user;
const Chat = prisma.chat;
const Message = prisma.Message; 
const ChatParticipants =prisma.chatParticipants;

 export { User, Chat, Message ,ChatParticipants};