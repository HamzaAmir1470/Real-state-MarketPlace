import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"; // 1. Import CORS

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

const app = express();

// 2. Configure CORS Middleware
app.use(
  cors({
    origin: [
      "https://real-state-market-place-4lxi.vercel.app", // Your Vercel domain
      "http://localhost:5173",                          // Vite local development
      "http://localhost:3000"                           // Alternative local port
    ],
    credentials: true, // Allows cookies to be passed across origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(cookieParser());

// 3. Root / Health-Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    message: "Server is up and running!",
    timestamp: new Date().toISOString()
  });
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Dynamically import Cloudinary route AFTER envs are loaded
import("./routes/cloudinary.route.js")
  .then((mod) => {
    const cloudinaryRouter = mod.default;
    app.use("/api/cloudinary", cloudinaryRouter);
    console.log("☁️ Cloudinary route loaded successfully");
  })
  .catch((err) => console.error("❌ Failed to load Cloudinary route:", err));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// For local testing (Vercel bypasses app.listen and uses serverless wrappers)
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
  });
}

// ✅ Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 4. Fixed Export for ES Modules ("type": "module")
export default app;