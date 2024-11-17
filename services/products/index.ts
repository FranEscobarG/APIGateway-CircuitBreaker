import express from "express";
import { productsHealthCheck } from "./health";

const app = express();
const PORT = 3002;

// Products Service Health Check
app.get("/health", productsHealthCheck);

// Example route (optional)
app.get("/", (req, res) => {
  res.send("Products Service: Welcome to the Products API!");
});

app.listen(PORT, () => {
  console.log(`Products Service running on http://localhost:${PORT}`);
});
