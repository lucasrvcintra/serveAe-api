import { Response } from 'express';
import { makeCreateUserService } from '../services/factories/makeCreateUserService';
import type { CreateUserDto } from '../dto/createUserDto';

const createUserService = makeCreateUserService();

export default {
  async createUser(request: CreateUserDto, response: Response) {
    try {
      const userData = request;
      await createUserService.create(userData);
      response.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      response.status(500).json('Erro ao criar usuário');
    }
  },
};
