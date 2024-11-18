import express from "express";
import userRoutes from "./routes/users.routes";
import productRoutes from "./routes/products.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("Application is healthy!");
});

export default app;
