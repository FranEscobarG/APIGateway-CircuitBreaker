import express, { Request, Response } from "express";
import { connectToDatabase } from "../../db";
import { User, syncUserModel } from "./user.model";
import { usersHealthCheck } from "./health";

const app = express();
const PORT = 3001;

app.use(express.json());

connectToDatabase().then(syncUserModel);

app.get("/health", usersHealthCheck);

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const newUser = await User.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

app.listen(PORT, () => {
  console.log(`Users Service running on http://localhost:${PORT}`);
});
