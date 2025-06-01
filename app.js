import express from "express";
import students from "./data/mock.json" assert { type: "json" };
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const PORT = 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Using the public folder at the root of the project
app.use(express.static(path.join(__dirname, "public")));

//Using the images folder at the root/images
// app.use("/images", express.static("images"));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if (req.method === "POST") {
    const token = req.headers["authorization"];
    if (!token || token !== "Bearer mysecrettoken") {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid or missing token" });
    }
  }
  next();
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Missing title or content" });
  }
  const post = { id: 1, title, content };
  res.status(201).json({ message: "Post created", post });
});


app.get("/", (req, res) => {
  res.json(students);
});

app.get("/student/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find((user) => user.id === parseInt(studentId));
  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.send(student);
});

// 404 Handler (runs if no previous middleware handled the request)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Unexpected Error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
