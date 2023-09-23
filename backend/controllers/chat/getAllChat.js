import { response } from "express";
import { prisma } from "../../prisma/index.js"


export async function getAllChat(req,res){
  const chatId = req.params;
  return res.json(chatId)
try{
const {userId} =req.userId;
const chatsForUser = await prisma.chatParticipants.findMany({
    where: {
      userId: userId,
    },
    include: {
      chat: true,
      chatParticipants:true,
    
    },
  });
if(!chatsForUser){
    return res.json({
        success:true,
        messsage:"chat not found"
    })
}
return res.json(chatsForUser)
} catch(error){
res.json({messsage:"failed to get chat"})
}
}