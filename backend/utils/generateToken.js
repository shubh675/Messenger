import jwt from "jsonwebtoken"
export const generateToken = (userId) => {
  return jwt.sign({userId:userId}, process.env.SECRET_KEY);
}

export function verifyToken(token){
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  if(decoded?.userId){
    return decoded.userId;
  }else{
    return null;
  }
}

