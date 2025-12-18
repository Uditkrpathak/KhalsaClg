import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
