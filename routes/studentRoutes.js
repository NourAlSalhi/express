import express from "express";
import students from "../data/mock.json" assert { type: "json" };

const router = express.Router();

// GET all students
router.get("/", (req, res) => {
  res.json(students);
});

// GET student by ID
router.get("/student/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find((user) => user.id === studentId);
  if (!student) {
    return res.status(404).send("Student not found");
  }
  res.send(student);
});

// POST create new student
router.post("/student", (req, res) => {
  const { name, class: className } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    className,
  };
  students.push(newStudent);
  res.status(201).send(newStudent);
})
export default router;
