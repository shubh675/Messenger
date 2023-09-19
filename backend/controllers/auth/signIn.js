import { matchPassword } from "../../utils/encryption.js";
import { prisma } from "../../prisma/index.js";
import { generateToken } from "../../utils/generateToken.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "email required" });
  } else if (!password) {
    res.status(400).json({ success: false, message: "password required" });
  } else {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      if (!user) {
        res
          .status(404)
          .json({
            success: false,
            message: "user  does not exist with this email",
          });
      } else {
        const hashedPassword = user.password;
        const matched = await matchPassword(password, hashedPassword);

        if (!matched) {
          res
            .status(401)
            .json({ success: false, message: " password incorrect" });
        }

        if (matched) {
          const token = generateToken(user.userId);
          res
            .status(200)
            .cookie("access_token", "Bearer " + token, {
              expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
            })
            .json({
              success: true,
              token: token,
              user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                pic: user.pic,
              },
            });
        }
      }
    } catch (error) {
      console.log("shubham", error);
      res.status(400).json({
        success: false,
        msssage: error.message,
      });
    }
  }
};
