import { ProductRepository } from "../../../domain/products/product.repository";

export class GetProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
