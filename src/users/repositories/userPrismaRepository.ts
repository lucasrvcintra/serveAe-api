import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from './userRepository';

export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
