import {prisma} from "../../prisma/index.js"

export const searchUser = async (req, res) => {
  try {
    const searchTerm = req.query.search || ""; // Get the search term from the query parameter 'q'

    // Query users whose names contain the search term
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: searchTerm, mode: "insensitive" } },
          { lastName: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,  
      },
    });

   return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
