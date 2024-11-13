import { PrismaClient, Product, Prisma } from '@prisma/client';
import { ProductRepository } from './productRepository';

export class ProductPrismaRepository implements ProductRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
