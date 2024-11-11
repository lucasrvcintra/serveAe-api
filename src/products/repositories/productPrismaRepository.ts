import { PrismaClient, Product, Prisma } from '@prisma/client';
import { ProductRepository } from './productRepository';

export class PrismaProductRepository implements ProductRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }
}
