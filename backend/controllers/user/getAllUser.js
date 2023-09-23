import { prisma} from "../../prisma/index.js";

export async function getAllUser( _, res) {

  try {
    const allUsers = await prisma.user.findMany({
        select: {
            userId: true,
            email: true,
            firstName: true,
            lastName: true,
            pic: true,
            // Exclude the 'password' field
          },
        }
    );
    if(allUsers){
        res.status(200).json({
            success:true,
            user:allUsers,
        })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}