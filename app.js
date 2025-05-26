import express from 'express';
import data from './data/mock.json' assert { type: 'json' };


const app = express();
const PORT = 3000;

//Using the public folder at the root of the project
app.use(express.static("public"));

//Using the images folder at the root/images
app.use("/images",express.static("images"));

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