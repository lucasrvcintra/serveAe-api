import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/createUserDto';
import { UserRepository } from '../repositories/userRepository';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async create(request: CreateUserDto): Promise<User> {
    const { name, email, address, phone } = request;

    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error('Usuário já cadastrado');
    }

    const newUser = await this.userRepository.create({
      name,
      email,
      address,
      phone,
    });

    return newUser;
  }
}
