import "dotenv/config";
import express, { urlencoded } from "express";
import { authRouter } from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express(urlencoded));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
