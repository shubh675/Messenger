import express from "express"
import { getAllUser } from "../controllers/user/getAllUser.js";
import { searchUser } from "../controllers/user/searchUser.js";


export const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.get("/search",searchUser);