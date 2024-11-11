import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { UpdateProductDto } from '../dto/updateProductDto';
import { Response } from 'express';

export class UpdateProductService {
  constructor(private productRepository: ProductRepository) {}

  async updateProduct(
    id: string,
    productData: UpdateProductDto
  ): Promise<Product> {
    const { name, description, price, imageUrl, category } = productData;

    const verifyProduct = await this.productRepository.findById(id);
    if (!verifyProduct) {
      throw new Error('Produto não encontrado');
    }

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
