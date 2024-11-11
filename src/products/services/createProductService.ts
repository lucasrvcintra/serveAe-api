import { Product } from '@prisma/client';
import { CreateProductDto } from '../dto/createProductDto';
import { ProductRepository } from '../repositories/productRepository';

export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(productData: CreateProductDto): Promise<Product> {
    const { name, description, price, imageUrl, category } = productData;

    const product = await this.productRepository.create({
      name,
      description,
      price,
      imageUrl,
      category,
    });

    return product;
  }
}
