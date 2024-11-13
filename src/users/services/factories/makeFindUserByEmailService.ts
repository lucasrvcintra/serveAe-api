import { UserPrismaRepository } from '../../repositories/userPrismaRepository';
import { FindUserByEmailService } from '../findUserByEmailService';

export function makeFindUserService() {
  const usersRepository = new UserPrismaRepository();
  const findUserByEmailService = new FindUserByEmailService(usersRepository);

  return findUserByEmailService;
}
