import { PrismaUserRepository } from '../../repositories/userPrismaRepository';
import { CreateUserService } from '../createUserService';

export function makeCreateUserService() {
  const usersRepository = new PrismaUserRepository();
  const createUserService = new CreateUserService(usersRepository);

  return createUserService;
}
