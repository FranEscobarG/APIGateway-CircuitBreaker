import express from "express";
import { usersHealthCheck } from "./health";

const app = express();
const PORT = 3001;

// Users Service Health Check
app.get("/health", usersHealthCheck);

// Example route (optional)
app.get("/", (req, res) => {
  res.send("Users Service: Welcome to the Users API!");
});

app.listen(PORT, () => {
  console.log(`Users Service running on http://localhost:${PORT}`);
});
