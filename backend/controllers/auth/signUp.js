import { prisma } from "../../prisma/index.js";
import { generateToken } from "../../utils/generateToken.js";
import { hashPassword } from "../../utils/encryption.js";

export const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName) {
    res.status(400).json({ success: false, message: "firstName required" });
  }
  if (!lastName) {
    res.status(400).json({ success: false, message: "lastName required" });
  }
  if (!email) {
    res.status(400).json({ success: false, message: "email required" });
  }
  if (!password) {
    res.status(400).json({ success: false, message: "password required" });
  } else {
    try {
      const hashedPassword = await hashPassword(password);
      const user = await prisma.User.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        },
      });

      if (user) {
        const token = generateToken(user.id);
        res.status(201).cookie('access_token', 'Bearer ' + token, {
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
      }).json({
        success:true,
        token:token,
        user:{
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
      }
    });
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
