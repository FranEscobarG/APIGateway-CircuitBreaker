import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// Route for Users Service
app.use("/users", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`http://localhost:3001${req.url}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Users service is unavailable.");
  }
});

// Route for Products Service
app.use("/products", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`http://localhost:3002${req.url}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Products service is unavailable.");
  }
});

// Health Check for Gateway
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("API Gateway is healthy!");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
