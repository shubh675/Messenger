import express from "express"
import {signUpUser} from "../controllers/auth/signUp.js"
import { signIn } from "../controllers/auth/signIn.js";

export const authRouter = express.Router();
authRouter.post("/signup",signUpUser);
authRouter.post("/signin",signIn);
