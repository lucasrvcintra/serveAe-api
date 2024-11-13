import { describe, it } from '@jest/globals';
import { FindUserByEmailService } from '../services/findUserByEmailService';
import { UserPrismaRepository } from '../repositories/userPrismaRepository';
import type { User } from '@prisma/client';

let createUserService: FindUserByEmailService;
let userPrismaRepository: UserPrismaRepository;

jest.mock('../repositories/userPrismaRepository');
describe('CreateUserService', () => {
  beforeEach(() => {
    userPrismaRepository = new UserPrismaRepository();
    createUserService = new FindUserByEmailService(userPrismaRepository);
  });

  it('should find a user by email', async () => {
    const email = 'john@example.com';

    const user: User = {
      id: '37fd1baf-e41b-4cd6-87e7-1347f5db51cb',
      name: 'John Doe',
      email,
      address: '123 Main St',
      phone: '123456789',
    };

    userPrismaRepository.findByEmail = jest.fn().mockResolvedValue(user);

    const foundUser = await createUserService.findUserByEmail(email);

    expect(foundUser).toEqual(user);
    expect(userPrismaRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should not find a user, because email is not being used', async () => {
    const email = 'john@example.com';

    userPrismaRepository.findByEmail = jest.fn().mockResolvedValue(null);

    await expect(createUserService.findUserByEmail(email)).rejects.toThrow(
      new Error('Usuário não encontrado')
    );
    expect(userPrismaRepository.findByEmail).toHaveBeenCalledWith(email);
  });
});
