import { PrismaProductRepository } from '../../repositories/productPrismaRepository';
import { GetProductByIdService } from '../getProductByIdService';

export function makeGetProductByIdService() {
  const productsRepository = new PrismaProductRepository();
  const getProductById = new GetProductByIdService(productsRepository);

  return getProductById;
}
