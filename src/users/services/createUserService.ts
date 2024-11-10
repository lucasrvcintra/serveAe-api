import { CreateUserDto } from '../dto/createUserDto';
import { UserRepository } from '../repositories/userRepository';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async create(request: CreateUserDto) {
    const { name, email, address, phone } = request;

    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error('Usuário já cadastrado');
    }

    // if (!name || !email || !address || !phone) {
    //   throw new Error('Campos obrigatórios não preenchidos');
    // }

    const newUser = await this.userRepository.create({
      name,
      email,
      address,
      phone,
    });

    return newUser;
  }
}
