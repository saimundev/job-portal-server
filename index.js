import express from "express";
import cors from "cors";
import jobRouter from "./routes/post-job.js";
import employerRouter from "./routes/employer.js";
import userRouter from "./routes/user.js";
import ApplyRouter from "./routes/apply-job.js";
import connectDB from "./models/db.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

//app init
const app = express();

//env config
dotenv.config();

//db connect
connectDB();

//port
const port = process.env.PORT || 5050;

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/job", jobRouter);
app.use("/api/employer", employerRouter);
app.use("/api/user", userRouter);
app.use("/api/apply", ApplyRouter);

//server
app.listen(port, () => {
  console.log("server is runing on the port is 5050");
});
