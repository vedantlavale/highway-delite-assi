import express from "express";
import cors from "cors";
import connectDB from "./src/db/connectDB";
import rootRouter from "./src/routes/index";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend and backend ports
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", rootRouter);

// Connect to database and start server
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    // Start server anyway
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (DB connection failed)`);
    });
  }
}

startServer();
