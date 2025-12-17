import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory tasks
let tasks = [
  { id: 1, title: "Finish DevTrack-Lite frontend", scheduledDate: "2025-12-17" },
  { id: 2, title: "Connect tasks API", scheduledDate: "2025-12-18" },
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {
  const { title, scheduledDate } = req.body;
  if (!title || !scheduledDate) {
    return res.status(400).json({ error: "Title and scheduledDate required" });
  }

  const newTask = { id: tasks.length + 1, title, scheduledDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
