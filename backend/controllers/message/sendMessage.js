import { prisma, Chat } from "../../prisma/index.js";

export async function sendMessage(req, res) {
    const { chatId } = req.params;
    try {
        const { content, senderId } = req.body;
        const newMessage = await prisma.message.create({
          data: {
            content: content,
            senderId: senderId,
            chatId: chatId,
          },
        });
    
        res.status(201).json({
          success: true,
          message: 'Message sent successfully',
          messageData: newMessage,
        });
      } catch (error) {
        
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }
}





