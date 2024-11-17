import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json()); // Para parsear el cuerpo de las solicitudes

// Middleware para manejar las solicitudes de usuarios
app.use("/users", async (req: Request, res: Response) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3001${req.url}`,
      data: req.body, // Pasar el cuerpo de la solicitud
      headers: req.headers, // Pasar encabezados como autenticación, etc.
    });
    res.status(response.status).json(response.data); // Respuesta directa del servicio
  } catch (error: any) {
    console.error("Error in Users Service:", error.message);
    res.status(error.response?.status || 500).send("Users service is unavailable.");
  }
});

// Middleware para manejar las solicitudes de productos
app.use("/products", async (req: Request, res: Response) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3002${req.url}`,
      data: req.body, // Pasar el cuerpo de la solicitud
      headers: req.headers, // Pasar encabezados como autenticación, etc.
    });
    res.status(response.status).json(response.data); // Respuesta directa del servicio
  } catch (error: any) {
    console.error("Error in Products Service:", error.message);
    res.status(error.response?.status || 500).send("Products service is unavailable.");
  }
});

// Health Check para el Gateway
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("API Gateway is healthy!");
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
