import "dotenv/config";
import express from "express";
import { userRouter } from "./routes/userRoute.js";



const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hellow Shubham");
});

app.use("/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
