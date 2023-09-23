import { prisma, Chat } from "../../prisma/index.js";

export async function getAllMessage(req, res) {
  const { chatId } = req.params;
  try {
    const chatExist = await prisma.chat.findUnique({
      where: {
        chatId: chatId,
      },
    });
    if (!chatExist) {
      return res.json({
        success: false,
        message: "chat not exists with this chatId",
      });
    }

    const messages = await prisma.message.findMany({
        where: {
          chatId: chatId,
        },
      });

    if(messages){
        return res.json({
            success:true,
            messages:messages
        })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
