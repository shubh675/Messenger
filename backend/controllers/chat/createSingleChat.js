import { prisma, Chat } from "../../prisma/index.js";

export async function createSingleChat(req, res) {
  const { participantId } = req.body;

  const { userId } = req.userId;

  try {
    const participantsUserName = await prisma.user.findUnique({
      where: {
        userId: participantId,
      },
    });
    
    if (!participantsUserName) {
      return res.status(400).json({
        success: false,
        message: "invalid participantId",
      });
    }

    const participantIds = [userId,participantId]
    const existingChat =  await prisma.chat.findFirst({
        where: {
          AND: [
            { isGroupChat: false }, // Optional: You can add this condition to filter for non-group chats if needed
            {
              participants: {
                every: {
                  userId: {
                    in: participantIds,
                  },
                },
              },
            },
          ],
        },
      });
 
    // If the chat already exists, return it.
    if (existingChat) {
      return res.json({...existingChat,chatExist:true});
    } 

    // Create a new chat.
    const chat = await Chat.create({
      data: {
        chatName: `${participantsUserName.firstName} ${participantsUserName.lastName}`,
        participants: {
          create: [{ userId: participantId }, { userId: userId }],
        },
    
      },
      include: {
        participants: true, // Include all posts in the returned object
      }, 
    });

    res.json(chat);
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}
