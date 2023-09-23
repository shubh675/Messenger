import "dotenv/config";
import express, { urlencoded } from "express";
import { authRouter } from "./routes/authRouter.js";
import { chatRouter } from "./routes/chatRouter.js";
import { userRouter } from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleware/authMiddleware.js";
import { messageRouter } from "./routes/messageRouter.js";
import { errorHandler,notFound } from "./middleware/errorMiddleware.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express(urlencoded));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(isAuthenticated);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRouter);
app.use('/api/user',userRouter);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
