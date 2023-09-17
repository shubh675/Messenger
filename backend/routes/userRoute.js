import express from "express"
import {signUpUser} from "../controllers/userController.js"

export const userRouter = express.Router();
userRouter.post("/signup",signUpUser);
