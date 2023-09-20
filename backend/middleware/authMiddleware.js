import { prisma } from "../prisma/index.js";
import { verifyToken } from "../utils/generateTOken.js";

const isAuthenticated = async (req, res, next) => {
  if (req?.cookies?.access_token) {
    try {
      const token = req.cookies.access_token;
      //user Id from decoded token
      const userId = verifyToken(token);
      if (!userId) {
        res.status(403).json({
          success: false,
          message: "Not authorized, token failed",
        });
        throw new Error("Not authorized, token failed");
      }
      req.userId = await prisma.user.findUnique({
        where: { userId: userId },
        select: { userId: true },
      });

      next();
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

export { isAuthenticated };
