import express from "express";
import axios from "axios";
import { gatewayHealthCheck } from "./health-check";

const app = express();
app.use(express.json());

app.use("/users", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3001${req.url}`,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).send("Users service is unavailable.");
  }
});

app.use("/products", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3002${req.url}`,
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).send("Products service is unavailable.");
  }
});

app.get("/health", gatewayHealthCheck);

export default app;
