import express from "express";
import dotenv from "dotenv";
import router from "./routes/authroute.js";
import { connectDB } from "./database/db.js";
import cookieparser from "cookie-parser";
import mainRouter from "./routes/mainroute.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://expense-tracker-frontend-sand-seven.vercel.app",
    credentials: true,
  }),
);
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth/", router);
app.use("/api/tracker/", mainRouter);

await connectDB();

export default app;
