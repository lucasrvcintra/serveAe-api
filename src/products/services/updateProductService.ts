import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { UpdateProductDto } from '../dto/updateProductDto';

export class UpdateProductService {
  constructor(private productRepository: ProductRepository) {}

  async updateProduct(
    id: string,
    productData: UpdateProductDto
  ): Promise<Product> {
    const { name, description, price, imageUrl, category } = productData;

    const product = await this.productRepository.update(id, {
      name,
      description,
      price,
      imageUrl,
      category,
    });

    return product;
  }
}
