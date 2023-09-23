import "dotenv/config";
import express, { urlencoded } from "express";
import { authRouter } from "./routes/authRouter.js";
import { chatRouter } from "./routes/chatRouter.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleware/authMiddleware.js";
import { messageRouter } from "./routes/messageRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express(urlencoded));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(isAuthenticated);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRouter);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
