import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev", { skip: (req) => req.url.startsWith("/static") }));

// Auth middleware for POST
app.use((req, res, next) => {
  if (req.method === "POST") {
    const token = req.headers["authorization"];
    if (!token || token !== "Bearer mysecrettoken") {
      return res.status(403).json({ error: "Forbidden: Invalid or missing token" });
    }
  }
  next();
});

// Routes
app.use("/", studentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} — ${err.stack}`);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
