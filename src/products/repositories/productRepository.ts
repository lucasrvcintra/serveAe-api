import { Prisma, Product } from '@prisma/client';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
}
