import "express-async-errors";
// import mongoose from "mongoose";
import connectDB from "./db/connectDB.js";
import userRouter from "./Routes/userRoute.js";
import videoRouter from "./Routes/videoRoute.js";
import imageRouter from "./Routes/imageRoute.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import NotFoundErrorMiddleware from "./middleware/not-found.js";
import auth from "./middleware/auth.js";
//deploy
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
//socket.io
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use("/uploads/images", express.static(path.join("uploads", "images")));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/image", imageRouter);
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
//socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("join_comment", (data) => {
    socket.join(data);
  });
  socket.on("send_comment", (data) => {
    socket.to(data.id).emit("sendback_comment", data);
  });
});
//start server
//error handler middlewares
app.use(errorHandlerMiddleware);
app.use(NotFoundErrorMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`server is on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
