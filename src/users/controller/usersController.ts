import { Request, Response } from 'express';
import { create } from '../services/createUserService';

export default {
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await create(userData);
      res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },
};
