import express from 'express';
import data from './data/mock.json' assert { type: 'json' };


const app = express();
const PORT = 3000;

app.get("/",(req,res) => {
  res.json(data)
})

app.post("/create",(req,res) => {
  res.send("This is a Post Reauest at /create")
})

app.put("/edit",(req,res) => {
  res.send("This is a Edit Reauest at /edit")
})

app.delete("/delete",(req,res) => {
  res.send("This is a Delete Reauest at /delete")
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000")
})