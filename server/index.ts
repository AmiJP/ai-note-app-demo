import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AppDataSource } from "./src/database/data-source";
import { userRouter, noteRouter } from "./src/routes";
import { errorHandler } from "./src/middlewares/errorHandler";
import session from "express-session";
import dotenv from "dotenv";
import { isAuthenticated } from "./src/middlewares/isAuthenticated";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Session middleware for express session
app.use(
  session({
    name: "ua",
    secret: "secret_token", // TODO: load from env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("🚀 Connection to database established successfully");
  })
  .catch((error) => console.log(error));

app.use("/user", userRouter);
app.use(isAuthenticated);
app.use("/note", noteRouter);

// Error handler middleware
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
