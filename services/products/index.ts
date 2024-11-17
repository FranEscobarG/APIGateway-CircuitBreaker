import express, { Request, Response } from "express";
import { connectToDatabase } from "../../db";
import { Product, syncProductModel } from "./product.model";
import { productsHealthCheck } from "./health";

const app = express();
const PORT = 3002;

app.use(express.json()); // Middleware para parsear JSON

// Conectar a la base de datos
connectToDatabase().then(syncProductModel);

// Health Check
app.get("/health", productsHealthCheck);

// Crear un producto
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await Product.create({ name, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// Obtener todos los productos
app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

app.listen(PORT, () => {
  console.log(`Products Service running on http://localhost:${PORT}`);
});
