import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

interface ErrorStatus extends Error {
  status?: number;
}

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.use(express.static(path.join(__dirname, "../dist")));
app.use(cors());
app.use(express.json());

app.use((err: ErrorStatus, req: Request, res: Response, next: NextFunction) => {
  res.send(err.message || "서버에서 에러가 발생하였습니다.");
  res.status(err.status || 500);
});

export async function connectToDataBase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI not defined");
    }
    const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected: ${connected.connection.host}`);
  } catch (err) {
    process.exit(1);
  }
}
connectToDataBase();

app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
