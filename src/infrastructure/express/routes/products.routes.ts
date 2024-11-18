import express from "express";
import { CreateProduct } from "../../../application/products/use-cases/create-product";
import { GetProducts } from "../../../application/products/use-cases/get-products";
import { ProductModel } from "../../db/product.model";
import { Product } from "../../../domain/products/product.entity";

const router = express.Router();

// Repositorio para mapear modelo Sequelize a entidad Producto
const productRepository = {
  create: async (product: Product) => {
    const createdProduct = await ProductModel.create({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    return new Product(
      createdProduct.id,
      createdProduct.name,
      createdProduct.price,
      createdProduct.stock
    );
  },
  findAll: async () => {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new Product(product.id, product.name, product.price, product.stock)
    );
  },
};

// Endpoint para crear un producto
router.post("/", async (req, res) => {
  try {
    const createProduct = new CreateProduct(productRepository);
    const product = await createProduct.execute(
      req.body.name,
      req.body.price,
      req.body.stock
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// Endpoint para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const getProducts = new GetProducts(productRepository);
    const products = await getProducts.execute();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});

export default router;
