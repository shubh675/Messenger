import { prisma } from "../prisma/index.js";
import { generateToken } from "../utils/generateToken.js";

export const signUpUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json("Please Enter all the field");
  } else {
    try {
      const user = await prisma.User.create({
        data: {
          name: name,
          email: email,
        },
      });

      if (user) {
        const token = generateToken(user.id);
        res.status(201).json({
          id: user.id,
          name: user.name,
          email: user.email,
          token: token,
        });
      }
    } catch (error) {
      console.log("shubham", error);
      res.status(400).json({
        success: false,
        msssage: "failed to  to signup",
      });
    }
  }
};




