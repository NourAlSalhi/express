import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;

const users = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@gmail.com",
    password: "123456",
  },
  {
    id: 3,
    name: "Bob",
    email: "bob@gmail.com",
    password: "123456",
  },
];

//Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

//Get user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

//Create new user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});


// PUT (update all fields) a user
app.put("/users/:id", (req, res) => {
  const { name, email, password } = req.body;
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  user.name = name;
  user.email = email;
  user.password = password;
  res.json(user);
});

// DELETE a user
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.send("User deleted");
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
