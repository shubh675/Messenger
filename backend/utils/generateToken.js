import jwt from "jsonwebtoken"
export const generateToken = (userId) => {
  return jwt.sign({userId:userId}, process.env.SECRET_KEY);
}