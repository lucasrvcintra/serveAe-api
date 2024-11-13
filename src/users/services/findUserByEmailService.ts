import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';
import { CustomError } from '../../middlewares/errorHandler';

export class FindUserByEmailService {
  constructor(private userRepository: UserRepository) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const error = new Error() as CustomError;
      error.status = 404;
      error.message = 'Usuário não encontrado';
      throw error;
    }

    return user;
  }
}
