import express from "express"
import {signUpUser} from "../controllers/auth/signUp.js"

export const authRouter = express.Router();
authRouter.post("/signup",signUpUser);
