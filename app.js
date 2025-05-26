import express from 'express';
import data from './data/mock.json' assert { type: 'json' };


const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000")
  console.log(data)
})