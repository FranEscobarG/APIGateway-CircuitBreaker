import { Product } from "../../../domain/products/product.entity";
import { ProductRepository } from "../../../domain/products/product.repository";

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(name: string, price: number, stock: number): Promise<Product> {
    const product = new Product("", name, price, stock);
    return await this.productRepository.create(product);
  }
}
