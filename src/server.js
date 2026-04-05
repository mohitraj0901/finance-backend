import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";




dotenv.config();
connectDB();

const app = express();

// 🔥 Middleware (IMPORTANT)
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/protected", protectedRoutes);

// 🔥 Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});