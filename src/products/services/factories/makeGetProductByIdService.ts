import { ProductPrismaRepository } from '../../repositories/productPrismaRepository';
import { GetProductByIdService } from '../getProductByIdService';

export function makeGetProductByIdService() {
  const productsRepository = new ProductPrismaRepository();
  const getProductById = new GetProductByIdService(productsRepository);

  return getProductById;
}
