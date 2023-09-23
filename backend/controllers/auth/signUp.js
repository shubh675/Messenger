import { prisma } from "../../prisma/index.js";
import { generateToken } from "../../utils/generateToken.js";
import { hashPassword } from "../../utils/encryption.js";

export const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password ,pic} = req.body;

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
      const userExist = await prisma.user.findUnique({
        where: { email: email },
        select:{email:true}
      });
      if(userExist){
        res.status(409).json({ success: false, message: "user exist with this email" });
      }else{
      const hashedPassword = await hashPassword(password);
      const user = await prisma.User.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
          pic:pic,
        },
      });

      if (user) {
        const token = generateToken(user.userId);
        res.status(201).cookie('access_token', token, {
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
      }).json({
        success:true,
        token:token,
        user:{
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
        pic:user.pic,
      }
    });
      }}
    } catch (error) {
      console.log("shubham", error);
      res.status(400).json({
        success: false,
        msssage: error.message,
      });
    }
  }
};
